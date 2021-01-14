import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Common, Content, User } from '../../shared/models';
import { FromUser, UserAction } from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {

    type: Content.EPaymentResult;
    queryParams: Content.IPaymentQueryParams;
    paymentResultEnum = Content.EPaymentResult;
    profile$: Observable<User.IProfile>;
    payAmount: number;

    constructor(
        private AR: ActivatedRoute,
        private STORE: Store,
        private LOCAL_STORAGE: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.type = this.AR.snapshot.params.type;
        this.queryParams = this.AR.snapshot.queryParams;
        this.payAmount = this.LOCAL_STORAGE.getValue(Common.ELocalStorageKey.PayAmount);
        this.profile$ = this.STORE
            .select(FromUser.User)
            .pipe(
                tap(data => {
                    if (!data) {
                        this.STORE.dispatch(new UserAction.GetProfile());
                    }
                })
            );
    }

}
