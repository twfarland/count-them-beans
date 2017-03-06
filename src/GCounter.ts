
export interface GCounter {
    key: string;
    state: {
        [key: string]: number;
    };
}

function uuid (): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
        return v.toString(16)
    })
}

export function create (): GCounter {
    const key = uuid()
    return {
        key,
        state: { [key]: 0 }
    }
}

// Adds delta to counter, as tracked by node
export function increment (g: GCounter, key: string, delta: number = 1): void {
    if (delta < 0) {
        throw new Error("Can't decrement a GCounter")
    }
    if (typeof g.state[key] !== 'undefined') {
        g.state[key] += delta
    } else {
        g.state[key] = delta
    }
}

// Sets value of counter, as tracked by node
export function update (g: GCounter, key: string, val: number) {
    g.state[key] = val
}

// Gets sum
export function query (g: GCounter): number {
    let value = 0
    for (let key in g.state) {
        value += g.state[key]
    }
    return value
}

// Merge with another GCounter and return the merged copy.
// It should be commutative, associative, and idempotent.
// It keeps the same key as the first.
export function merge (g1: GCounter, g2: GCounter): GCounter {

    const keys = {}
    const g3 = { key: String(g1.key), state: {} }

    // get union of keys
    for (let key in g1.state) { keys[key] = true }
    for (let key in g2.state) { keys[key] = true }

    // get max of keys
    for (let key in keys) {
        g3.state[key] = Math.max(g1.state[key] || 0, g2.state[key] || 0)
    }
    
    return g3
}
