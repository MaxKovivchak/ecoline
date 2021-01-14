import { SimpleChange } from '@angular/core';

export enum ELocalStorageKey {
    Token = 'token',
    PayAmount = 'payAmount',
    XId = 'X-Id'
}

export interface IResult<T> {
    id: number;
    jsonrpc: string;
    result: T;
}

export interface IResultError {
    id: number;
    jsonrpc: string;
    error: {
        message: string,
        code: number
    };
}

export class HttpBase<T> {
    constructor(
        public params: T,
        public method = 'methodName',
        public jsonrpc = '2.0',
        public id = 1234567890
    ) {}
}

export class NameIdModel {
    constructor(
        public  id: number,
        public  name: string
    ) { }
}

export type EcoLineSimpleChanges<C> = { [key in keyof C]: SimpleChange; };
