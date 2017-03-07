import { GCounter, create, query, increment, merge } from './GCounter'
import { Message } from './GCounterMessages'

declare function postMessage(message: Message)

// create the GCounter and send creation message to main
const gCounter: GCounter = create()

postMessage({ 
    command: 'created', 
    gc: gCounter
})

// every 1-5 seconds, notify main of the current value
function randomInt (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomNotify () {
    setTimeout(() => {
        postMessage({ 
            command: 'notify', 
            gc: gCounter
        })
        setTimeout(() => {
            postMessage({
                command: 'notified',
                gc: gCounter
            })
        }, 200)
        randomNotify()
    }, randomInt(1, 5) * 1000)
}

randomNotify()


// respond to incoming messages
onmessage = (e: MessageEvent) => {

    const message: Message = e.data

    switch (message.command) {
        
        case 'increment': // increment here and return incremented to main
            increment(gCounter, gCounter.key, 1)
            postMessage({
                command: 'incremented', 
                gc: gCounter
            }) 
            break

        case 'merge': // merge here and return merged to main
            gCounter.state = merge(gCounter, message.gc).state
            postMessage({
                command: 'merged', 
                gc: gCounter
            })
    }
}