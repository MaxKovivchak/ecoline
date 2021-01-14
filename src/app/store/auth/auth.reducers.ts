import { AuthAction } from '../index';
import { Auth, Common } from '../../shared/models';

export interface IAuthState {
    token: string;
    registrationData: Auth.IRegistrationData;
    registrationNumber: string;
    error: Common.IResultError;
}

export const initialAuthState: IAuthState = {
    token: null,
    registrationData: null,
    registrationNumber: null,
    error: null
};

export function authReducer(state: IAuthState = initialAuthState, action: AuthAction.Actions): IAuthState {
    switch (action.type) {
        case AuthAction.EType.LoginSuccess: {
            return {
                ...state,
                token: action.token,
                error: null
            };
        }
        case AuthAction.EType.LoginError: {
            return {
                ...state,
                error: action.error
            };
        }
        case AuthAction.EType.LogoutSuccess: {
            return {
                ...state,
                ...initialAuthState
            };
        }
        case AuthAction.EType.SetToken: {
            return {
                ...state,
                token: action.token
            };
        }
        case AuthAction.EType.RegisterNumberSuccess: {
            return {
                ...state,
                registrationData: action.data,
                registrationNumber: action.registrationNumber
            };
        }
        case AuthAction.EType.ResetRegisterData: {
            return {
                ...state,
                registrationData: initialAuthState.registrationData
            };
        }
        default:
            return state;
    }
}
