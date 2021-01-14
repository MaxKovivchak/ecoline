import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AuthAction, FromAuth } from '../index';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Auth, Common } from '../../shared/models';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private AUTH: AuthService,
        private ROUTER: Router,
        private STORE: Store,
        private LOCAL_STORAGE: LocalStorageService
    ) {}

    @Effect()
    login$ = this.actions$.pipe(
        ofType<AuthAction.Login>(AuthAction.EType.Login),
        switchMap(action => {
            const httpData: Common.HttpBase<Auth.ICredentials> = new Common.HttpBase<Auth.ICredentials>(action.credentials);
            return this.AUTH
                .login(httpData)
                .pipe(
                    map(data => new AuthAction.LoginSuccess(data.result.token)),
                    catchError(error => of(new AuthAction.LoginError(error.error)))
                );
        })
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType<AuthAction.LoginSuccess>(AuthAction.EType.LoginSuccess),
        tap(action => {
            this.LOCAL_STORAGE.setValue(Common.ELocalStorageKey.Token, action.token);
            this.ROUTER.navigate(['content']);
        })
    );

    @Effect()
    logout$ = this.actions$.pipe(
        ofType<AuthAction.Logout>(AuthAction.EType.Logout),
        switchMap(() =>
            this.AUTH
                .logout()
                .pipe(
                    map(() => new AuthAction.LogoutSuccess()),
                    catchError(error => of(new AuthAction.LogoutError(error)))
                )
        )
    );

    @Effect({ dispatch: false })
    logoutSuccess$ = this.actions$.pipe(
        ofType<AuthAction.LogoutSuccess>(AuthAction.EType.LogoutSuccess),
        tap(() => {
            this.LOCAL_STORAGE.removeValue(Common.ELocalStorageKey.Token);
            this.LOCAL_STORAGE.removeValue(Common.ELocalStorageKey.XId);
            this.ROUTER.navigate(['./login']);
        })
    );

    @Effect()
    registerNumber$ = this.actions$.pipe(
        ofType<AuthAction.RegisterNumber>(AuthAction.EType.RegisterNumber),
        switchMap(action =>
            this.AUTH
                .registerNumber(action.value)
                .pipe(
                    map(data => new AuthAction.RegisterNumberSuccess(data, action.value)),
                    catchError(error => of(new AuthAction.RegisterNumberError(error.error)))
                )
        )
    );

    @Effect()
    registerProfile$ = this.actions$.pipe(
        ofType<AuthAction.RegisterProfile>(AuthAction.EType.RegisterProfile),
        withLatestFrom(this.STORE.select(FromAuth.RegistrationNumber)),
        switchMap(([action, registrationNumber]) => {
            const data = {
                email: action.data.email,
                phone: action.data.phone,
                number: registrationNumber
            };

            return this.AUTH
                .registerProfile(data)
                .pipe(
                    map(() => new AuthAction.RegisterProfileSuccess()),
                    catchError(error => of(new AuthAction.RegisterProfileError(error)))
                );
        })
    );

}
