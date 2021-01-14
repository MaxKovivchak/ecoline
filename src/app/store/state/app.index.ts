import { ActionReducerMap } from '@ngrx/store';
import { UserEffects } from '../user/user.effects';
import { IUserState, profileReducer } from '../user/user.reducers';
import { authReducer, IAuthState } from '../auth/auth.reducers';
import { AuthEffects } from '../auth/auth.effects';
import { contentReducer, IContentState } from '../content/content.reducers';
import { ContentEffects } from '../content/content.effects';

export interface IAppState {
    user: IUserState;
    auth: IAuthState;
    content: IContentState;
}

export const appReducers: ActionReducerMap<IAppState, any> = {
    user: profileReducer,
    auth: authReducer,
    content: contentReducer,
};

export const appEffects = [
    UserEffects,
    AuthEffects,
    ContentEffects,
];
