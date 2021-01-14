import { Action } from '@ngrx/store';
import { Auth, Common } from '../../shared/models';

export enum EType {
    Login = '[Auth] Login User',
    LoginSuccess = '[Auth] Login User Success',
    LoginError = '[Auth] Login User Error',

    Logout = '[Auth] Logout User',
    LogoutSuccess = '[Auth] Logout User Success',
    LogoutError = '[Auth] Logout User Error',

    RegisterNumber = '[Auth] Register Number',
    RegisterNumberSuccess = '[Auth] Register Number Success',
    RegisterNumberError = '[Auth] Register Number Error',

    RegisterProfile = '[Auth] Register Profile',
    RegisterProfileSuccess = '[Auth] Register Profile Success',
    RegisterProfileError = '[Auth] Register Profile Error',

    SetToken = '[Auth] Set Token',

    ResetRegisterData = '[Auth] Reset Register Data'
}

export class Login implements Action {
    readonly type = EType.Login;

    constructor(public credentials: Auth.ICredentials) {}
}

export class LoginSuccess implements Action {
    readonly type = EType.LoginSuccess;

    constructor(public token: string) {}
}

export class LoginError implements Action {
    readonly type = EType.LoginError;

    constructor(public error: Common.IResultError) {}
}

export class Logout implements Action {
    readonly type = EType.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = EType.LogoutSuccess;
}

export class LogoutError implements Action {
    readonly type = EType.LogoutError;

    constructor(public error: any) {}
}

export class SetToken implements Action {
    readonly type = EType.SetToken;

    constructor(public token: string) {}
}

export class RegisterNumber implements Action {
    readonly type = EType.RegisterNumber;

    constructor(public value: string, public isContractNumber: boolean) {}
}

export class RegisterNumberSuccess implements Action {
    readonly type = EType.RegisterNumberSuccess;

    constructor(public data: Auth.IRegistrationData, public registrationNumber: string) {}
}

export class RegisterNumberError implements Action {
    readonly type = EType.RegisterNumberError;

    constructor(public error: Common.IResultError) {}
}

export class ResetRegisterData implements Action {
    readonly type = EType.ResetRegisterData;
}

export class RegisterProfile implements Action {
    readonly type = EType.RegisterProfile;

    constructor(public data: Partial<Auth.IRegistrationData>) {}
}

export class RegisterProfileSuccess implements Action {
    readonly type = EType.RegisterProfileSuccess;
}

export class RegisterProfileError implements Action {
    readonly type = EType.RegisterProfileError;

    constructor(public error: Common.IResultError) {}
}

export type Actions =
    | Login
    | LoginSuccess
    | LoginError

    | Logout
    | LogoutSuccess
    | LogoutError

    | RegisterNumber
    | RegisterNumberSuccess
    | RegisterNumberError

    | RegisterProfile
    | RegisterProfileSuccess
    | RegisterProfileError

    | SetToken

    | ResetRegisterData
    ;
