import { User } from '../../shared/models';
import { UserAction } from '../index';

export interface IUserState {
    profile: User.IProfile;
    error: any;
}

export const initialUserState: IUserState = {
    profile: null,
    error: null
};

export function profileReducer(state: IUserState = initialUserState, action: UserAction.Actions): IUserState {
    switch (action.type) {
        case UserAction.EType.GetProfileSuccess: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case UserAction.EType.UpdateProfileSuccess: {
            const profile = {
                ...state.profile,
                ...action.updateProfile
            };
            return {
                ...state,
                profile
            };
        }
        case UserAction.EType.GetProfileError: {
            return {
                ...state,
                error: action.error
            };
        }
        default:
            return state;
    }
}
