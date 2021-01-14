import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.index';

const selectUser = (state: IAppState) => state.user;

export const User = createSelector(
    selectUser,
    state => state.profile
);
