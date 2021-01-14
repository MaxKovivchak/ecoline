import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ELocalStorageKey } from './shared/models/common.model';
import { AuthAction } from './store';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SpinnerService } from './core/services/spinner.service';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    isLoading$: Observable<boolean>;

    constructor(
        private LOCAL_STORAGE: LocalStorageService,
        private STORE: Store,
        private SPINNER: SpinnerService
    ) {}

    ngOnInit(): void {

        this.isLoading$ = this.SPINNER
            .state
            .pipe(delay(10));

        const token = this.LOCAL_STORAGE.getValue<string>(ELocalStorageKey.Token);
        this.STORE.dispatch(new AuthAction.SetToken(token));
    }
}
