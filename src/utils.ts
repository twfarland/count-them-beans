
export function set (a, b) {
    const c = {}
    for (let p in a) { c[p] = a[p] }
    for (let p in b) { c[p] = b[p] }
    return c
}

export function firstKey (a, test) {
    for (let p in a) {
        if (test(a[p], p)) {
            return p
        }
    }
}

export function mapObject (a, f) {
    const res = []
    for (let p in a) {
        res.push(f(a[p], p))
    }
    return res
}