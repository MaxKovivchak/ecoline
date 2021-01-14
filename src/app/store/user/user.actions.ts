import { Action } from '@ngrx/store';
import { User } from '../../shared/models';

export enum EType {
    GetProfile = '[User] Get User Info',
    GetProfileSuccess = '[User] Get User Info Success',
    GetProfileError = '[User] Get User Info Error',

    UpdateProfile = '[User] Update User Info',
    UpdateProfileSuccess = '[User] Update User Info Success',
    UpdateProfileError = '[User] Update User Info Error',
}

export class GetProfile implements Action {
    readonly type = EType.GetProfile;
}

export class GetProfileSuccess implements Action {
    readonly type = EType.GetProfileSuccess;

    constructor(public profile: User.IProfile) {}
}

export class GetProfileError implements Action {
    readonly type = EType.GetProfileError;

    constructor(public error: any) {}
}

export class UpdateProfile implements Action {
    readonly type = EType.UpdateProfile;

    constructor(public updateProfile: User.IProfileChangeEvent) {}
}

export class UpdateProfileSuccess implements Action {
    readonly type = EType.UpdateProfileSuccess;

    constructor(public updateProfile: User.IProfileChangeEvent) {}
}

export class UpdateProfileError implements Action {
    readonly type = EType.UpdateProfileError;

    constructor(public error: any) {}
}

export type Actions =
    | GetProfile
    | GetProfileSuccess
    | GetProfileError
    | UpdateProfile
    | UpdateProfileSuccess
    | UpdateProfileError
    ;
