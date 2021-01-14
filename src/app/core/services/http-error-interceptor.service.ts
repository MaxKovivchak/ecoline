import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private ROUTER: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
            .handle(req)
            .pipe(this.errorHandler());
    }

    errorHandler = (): OperatorFunction<HttpResponse<any>, HttpResponse<any>> => catchError(err => {
        if (err instanceof HttpErrorResponse) {
            console.error(err);

            if (err.status === 401 || err.status === 403 || err.status === 400) {
                this.ROUTER.navigate(['/login']);
            }
        }

        return throwError(err);
    })

}
