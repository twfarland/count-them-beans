import { GCounter, merge } from './GCounter'
import { Message } from './GCounterMessages'
import { Signal, create, listen, send, fold, map } from 'acto'
import { set, firstKey } from './utils'
import { fromKeys, KeyCode } from './keyboard'

declare function postMessage(message: Message)

// ---------- Signals ----------

function toIncrementor (code: KeyCode): Message {
    const cluster = state.value
    const workerKey = firstKey(cluster, (w: GCounterWorker) => String(w.index) === code)
    return workerKey ? { command: 'increment', key: workerKey } : { command: 'none' }
}

function UIListener (message) {
    const cluster = state.value
    switch (message.command) { // Increment is the only message we receive from the UI
        case 'increment':
            cluster[message.key].worker.postMessage(message)
            break
    }
}

const keyIncrements = map(toIncrementor, fromKeys())
const inputBus  = create<Message>({ command: 'none' }) // takes input from UI
const workerBus = create<Message>({ command: 'none' }) // takes responses from Workers

// proxy UI messages to cluster - only 'increment'
listen(keyIncrements, UIListener)
listen(inputBus, UIListener)

// ---------- Reducer ----------

function reducer (message: Message, state: GCounterCluster): GCounterCluster {

    switch (message.command) {
        
        case 'created': // <-, sidefx
            index++
            return set(state, {
                [message.gc.key]: <GCounterWorker>{
                    index,
                    worker: message.worker,
                    gc: message.gc,
                    emitting: false
                }
            })

        case 'increment': // ->
            incrementWorker(message.key)
            return state

        case 'incremented': // <-
            return set(state, {
                [message.gc.key]: set(state[message.gc.key], {
                    gc: merge(state[message.gc.key].gc, message.gc)
                })
            })

        case 'notify': // ->, sidefx
            notifyWorkers(message.gc)
            return set(state, {
                [message.gc.key]: set(state[message.gc.key], { emitting: true })
            })

        case 'notified': // <-
            return set(state, {
                [message.gc.key]: set(state[message.gc.key], { emitting: false })
            }) 

        case 'merged': // <-
            return set(state, {
                [message.gc.key]: set(state[message.gc.key], {
                    gc: merge(state[message.gc.key].gc, message.gc)
                })
            })

        default: 
            return state
    }
}

// ---------- State ----------

var index = 0

export interface GCounterWorker {
    index: number;
    worker: Worker;
    gc: GCounter;
    emitting: boolean;
}

export interface GCounterCluster {
    [key: string]: GCounterWorker;
}

const initialState: GCounterCluster = {}

// the cluster state, folded with messages from workers
export const state = fold(reducer, initialState, workerBus)

// ---------- Actions ----------

// to be called from the dom
export function increment (key: string): void {
    send<Message>(inputBus, { command: 'increment', key })
}

// send increment command to worker
function incrementWorker (key: string) {
    const cluster = state.value
    cluster[key].worker.postMessage(<Message>{ command: 'increment', key })
}

// send the node value to any other workers
function notifyWorkers (gc: GCounter) {

    const cluster = state.value

    for (let _key in cluster) {
        if (_key !== gc.key) {
            cluster[_key].worker.postMessage(<Message>{ command: 'merge', gc })
        }
    }
}

// setup a new GCounter worker, and proxy its messages to the worker bus
// it will be added to the cluster when a 'created' message is received
export function spawn (): Worker {
    const worker = new Worker("js/GCounterWorker.js")
    worker.onmessage = (e: MessageEvent) => {
        const message: Message = e.data
        if (message.command === 'created') { message.worker = worker }
        send(workerBus, message)
    }
    return worker
}

export function spawnMany (n: number) {
    while (n > 0) {
        spawn()
        n--
    }
}
