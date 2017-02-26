
export interface None {
    command: 'none';
}

export interface Increment {
    command: 'increment';
    key: string;
}

export interface Created { 
    command: 'created';
    key: string;
    value: number;
    worker?: Worker;
}

export interface Update {
    command: 'update';
    key: string;
    value: number;
}

export interface Updated {
    command: 'updated';
    key: string;
    value: number;
}

export interface Notify {
    command: 'notify';
    key: string;
    value: number;
}

export interface Notified {
    command: 'notified';
    key: string;
}

export type Message
    = None 
    | Increment 
    | Created 
    | Update
    | Updated
    | Notify
    | Notified
