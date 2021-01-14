import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Common } from '../../shared/models';
import { SpinnerService } from './spinner.service';
import { delay, finalize, tap } from 'rxjs/operators';
import { DateUtils } from '../../shared/utils/date.util';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private LOCAL_STORAGE: LocalStorageService,
        private SPINNER: SpinnerService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const uniqueId = this.LOCAL_STORAGE.getValue(Common.ELocalStorageKey.XId);
        const token = this.LOCAL_STORAGE.getValue(Common.ELocalStorageKey.Token);
        const accessToken = token ? token : '';

        const withoutCredentials: boolean = !!req.clone().headers.get('WithoutCredentials');
        const timeStamp: string = DateUtils.timeStamp();

        if (withoutCredentials) {

            this.LOCAL_STORAGE.setValue(Common.ELocalStorageKey.XId, req.clone().headers.get('X-Id'));

            return next
                .handle(req.clone({
                    withCredentials: true,
                    headers: req.headers
                        .set('X-Id', `${req.clone().headers.get('X-Id')}`)
                        .set('IBSession', 'start')
                        .delete('WithoutCredentials')
                }))
                .pipe(
                    tap(() => this.SPINNER.show(timeStamp)),
                    delay(100),
                    finalize(() => this.SPINNER.hide(timeStamp))
                );
        }

        if (token && accessToken) {
            return next
                .handle(
                    req.clone({
                        headers: req.headers
                            .set('X-Id', `${uniqueId}`)
                            .set('X-User-Token', `${ accessToken }`)
                    })
                )
                .pipe(
                    tap(() => this.SPINNER.show(timeStamp)),
                    delay(100),
                    finalize(() => this.SPINNER.hide(timeStamp))
                );
        } else {
            return next.handle(req.clone({ withCredentials: true }));
        }
    }
}
