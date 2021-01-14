import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { FromUser, UserAction } from '../index';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from '../../core/services/profile.service';
import { Common, User } from '../../shared/models';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private PROFILE: ProfileService,
        private STORE: Store,
        private ROUTER: Router
    ) {}

    @Effect()
    getUserInfo$ = this.actions$.pipe(
        ofType<UserAction.GetProfile>(UserAction.EType.GetProfile),
        switchMap(() =>
            this.PROFILE
                .getInfo()
                .pipe(
                    map(data => new UserAction.GetProfileSuccess(data)),
                    catchError(error => of(new UserAction.GetProfileError(error)))
                )
        )
    );

    @Effect({ dispatch: false })
    getUserInfoError$ = this.actions$.pipe(
        ofType<UserAction.GetProfileError>(UserAction.EType.GetProfileError),
        tap(action => {
            if (action.error.status === 404 || action.error.status === 0) {
                this.ROUTER.navigate(['./login']);
            }
        })
    );

    @Effect()
    updateUserInfo$ = this.actions$.pipe(
        ofType<UserAction.UpdateProfile>(UserAction.EType.UpdateProfile),
        withLatestFrom(this.STORE.select(FromUser.User)),
        switchMap(([action, user]) => {
            const updatedData = {
                ...user,
                ...action.updateProfile
            };
            const httpData: Common.HttpBase<User.IProfile> = new Common.HttpBase<User.IProfile>(updatedData);
            return this.PROFILE
                .updateInfo(httpData)
                .pipe(
                    map(() => new UserAction.UpdateProfileSuccess(action.updateProfile)),
                    catchError(error => of(new UserAction.UpdateProfileError(error)))
                );
        })
    );

}
