import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.index';

const selectToken = (state: IAppState) => state.auth;

export const Token = createSelector(
    selectToken,
    state => state.token
);

export const Error = createSelector(
    selectToken,
    state => state.error
);

export const RegistrationData = createSelector(
    selectToken,
    state => state.registrationData
);

export const RegistrationNumber = createSelector(
    selectToken,
    state => state.registrationNumber
);
