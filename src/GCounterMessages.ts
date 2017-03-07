import { GCounter } from './GCounter'

export interface None {
    command: 'none';
    gc?: GCounter;
}

export interface Created { // <- after created in worker
    command: 'created';
    gc: GCounter;
    worker?: Worker;
}

export interface Increment { // -> sends request to increment worker.
    command: 'increment';
    key: string;
}

export interface Incremented { // <- incremented in worker, returns incremented to main. merge there 
    command: 'incremented';
    gc: GCounter;
}

export interface Notify { // <- random notification of value
    command: 'notify';
    gc: GCounter;
}

export interface Notified { // <-
    command: 'notified';
    gc: GCounter;
}

export interface Merge { // -> merge gc into gcTarget in a specific worker
    command: 'merge';
    gc: GCounter;
}

export interface Merged { // <- returns merged to main. merge there
    command: 'merged';
    gc: GCounter;
}

export type Message
    = None 
    | Created // <-
    | Increment // ->
    | Incremented // <-
    | Notify // <-
    | Notified
    | Merge // ->
    | Merged // <-
