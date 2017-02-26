import { GCounter } from './GCounter'
import { Message } from './GCounterMessages'
import { Signal, create, listen, send, fold, map, merge } from 'acto'
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
    switch (message.command) {
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

        case 'created':
            index++ // side effects
            return set(state, {
                [message.key]: {
                    worker: message.worker,
                    index,
                    total: 0,
                    emitting: false
                }
            })

        case 'updated':
            return set(state, {
                [message.key]: set(state[message.key], { total: message.value })
            })

        case 'notify':
            notify(message.key, message.value) // side effects
            return set(state, {
                [message.key]: set(state[message.key], { emitting: true })
            }) 

        case 'notified':
            return set(state, {
                [message.key]: set(state[message.key], { emitting: false })
            })

        default: 
            return state
    }
}

// ---------- State ----------

var index = 0

export interface GCounterWorker {
    key?: string;
    index: number;
    worker: Worker;
    total: number;
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

// send the node value to any other nodes
function notify (key: string, value: number) {

    const cluster = state.value

    for (let _key in cluster) {
        if (_key !== key) {
            cluster[_key].worker.postMessage({ command: 'update', key, value })
            setTimeout(() => 
                send<Message>(workerBus, { command: 'notified', key: _key }), 
                100
            )
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
