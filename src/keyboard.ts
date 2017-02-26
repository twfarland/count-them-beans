import { Signal, create, send } from 'acto'

export type KeyCode = string

export function fromKeys (): Signal<KeyCode> {
    const s = create("")
    window.onkeypress = function (e) {
        send(s, String.fromCharCode(e.keyCode))
    }
    return s
}
