import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {

    requestStamp: string;

    private spinnerState$ = new BehaviorSubject<boolean>(false);

    get state(): Observable<boolean> {
        return this.spinnerState$.asObservable();
    }

    show(stamp: string): void {
        this.requestStamp = stamp;

        this.spinnerState$.next(true);
    }

    hide(stamp: string): void {
        if (!this.requestStamp) {
            return;
        }
        if (this.requestStamp !== stamp) {
            return;
        }

        this.requestStamp = undefined;

        this.spinnerState$.next(false);
    }

}
