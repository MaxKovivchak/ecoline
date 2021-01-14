import { AbstractControl } from '@angular/forms';

export type FormControls<T extends number | string | symbol> = { [key in T]: AbstractControl };
export type FormObject<T extends number | string | symbol> = { [key in T]: any[]; };
export type FormKeys<T extends number | string | symbol> = { [key in T]: T; };

export enum EFormStatuses {
    Valid = 'VALID',
    Invalid = 'INVALID',
    Pending = 'PENDING',
    Disabled = 'DISABLED'
}
