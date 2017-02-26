import { GCounter, create, query, increment, update } from './GCounter'
import { Message } from './GCounterMessages'

declare function postMessage(message: Message)

// create the GCounter and send creation message to main
const gCounter: GCounter = create()

postMessage({ 
    command: 'created', 
    key: gCounter.key,
    value: query(gCounter)
})

// every 1-5 seconds, notify main of the current value
function randomInt (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNotify () {
    setTimeout(() => {
        postMessage({ 
            command: 'notify', 
            key: gCounter.key, 
            value: query(gCounter) 
        })
        randomNotify()
    }, randomInt(1, 5) * 1000)
}

randomNotify()

// post value back
function updated () {
    postMessage({
        command: 'updated', 
        key: gCounter.key, 
        value: query(gCounter) 
    }) 
}

// respond to incoming messages
onmessage = (e: MessageEvent) => {

    const message: Message = e.data

    switch (message.command) {
        
        case 'increment':
            increment(gCounter, gCounter.key, 1)
            updated()
            break

        case 'update': // this could also be done with merge()
            update(gCounter, message.key, message.value)
            updated()
    }
}