import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContentService } from '../../core/services/content.service';
import { ContentAction, FromAuth, FromContent } from '../index';
import { Store } from '@ngrx/store';
import { Common, Content } from '../../shared/models';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable()
export class ContentEffects {

    constructor(
        private actions$: Actions,
        private CONTENT: ContentService,
        private STORE: Store,
        private LOCAL_STORAGE: LocalStorageService
    ) {}

    @Effect()
    getTransactions$ = this.actions$.pipe(
        ofType<ContentAction.GetTransactions>(ContentAction.EType.GetTransactions),
        withLatestFrom(this.STORE.select(FromContent.TransactionOffset)),
        switchMap(([action, offset]) =>
            this.CONTENT
                .getTransactions(action.transactionType, offset)
                .pipe(
                    map(data => new ContentAction.GetTransactionsSuccess(data, action.isLoadMore)),
                    catchError(error => of(new ContentAction.GetTransactionsError(error)))
                )
        )
    );

    @Effect()
    getReportEPD$ = this.actions$.pipe(
        ofType<ContentAction.GetEPDReport>(ContentAction.EType.GetEPDReport),
        withLatestFrom(this.STORE.select(FromContent.DateRange)),
        switchMap(([action, dateRange]) => {
            const dateTime = dateRange.find(date => date.id === action.dateId) ?
                (dateRange.find(date => date.id === action.dateId).datetime).split('.').join('') : '';
            return this.CONTENT
                .getReportEPD(dateTime)
                .pipe(
                    map(result => new ContentAction.GetEPDReportSuccess(result.link)),
                    catchError(error => of(new ContentAction.GetEPDReportError(error)))
                );
        })
    );

    @Effect()
    getAgreement$ = this.actions$.pipe(
        ofType<ContentAction.GetAgreement>(ContentAction.EType.GetAgreement),
        switchMap(() => {
            return this.CONTENT
                .getAgreement()
                .pipe(
                    map(result => new ContentAction.GetEPDReportSuccess(result.link)),
                    catchError(error => of(new ContentAction.GetEPDReportError(error)))
                );
        })
    );

    @Effect()
    getReportReconciliation$ = this.actions$.pipe(
        ofType<ContentAction.GetReconciliationReport>(ContentAction.EType.GetReconciliationReport),
        withLatestFrom(this.STORE.select(FromContent.DateRange)),
        switchMap(([action, dateRange]) => {
            const dt = dateRange.find(date => date.id === action.date.dateFromId);

            const dateTimePeriod: Content.IReconciliationDatePeriod = {
                dateFrom: dt ? (dt.datetime).split('.').join('') : '',
                dateTo: dt ? (dt.datetime).split('.').join('') : '',
            };
            return this.CONTENT
                .getReportReconciliation(dateTimePeriod)
                .pipe(
                    map(result => new ContentAction.GetReconciliationReportSuccess(result.link)),
                    catchError(error => of(new ContentAction.GetReconciliationReportError(error)))
                );
        })
    );

    @Effect()
    getBalance$ = this.actions$.pipe(
        ofType<ContentAction.GetBalance>(ContentAction.EType.GetBalance),
        switchMap(() =>
            this.CONTENT
                .getBalance()
                .pipe(
                    map(result => new ContentAction.GetBalanceSuccess(result)),
                    catchError(error => of(new ContentAction.GetBalanceError(error)))
                )
        )
    );

    @Effect()
    getStartDate$ = this.actions$.pipe(
        ofType<ContentAction.GetStartDate>(ContentAction.EType.GetStartDate),
        switchMap(() =>
            this.CONTENT
                .getStartDate()
                .pipe(
                    map(data => new ContentAction.GetStartDateSuccess(data)),
                    catchError(error => of(new ContentAction.GetStartDateError(error)))
                )
        )
    );

    @Effect()
    pay$ = this.actions$.pipe(
        ofType<ContentAction.Pay>(ContentAction.EType.Pay),
        withLatestFrom(this.STORE.select(FromAuth.Token)),
        switchMap(([action, token]) => {
            const data = {...action.data, token};
            return this.CONTENT
                .pay(data)
                .pipe(
                    map(result => new ContentAction.PaySuccess(result, action.data.payAmount)),
                    catchError(error => of(new ContentAction.PayError(error)))
                );
        })
    );

    @Effect({ dispatch: false })
    paySuccess$ = this.actions$.pipe(
        ofType<ContentAction.PaySuccess>(ContentAction.EType.PaySuccess),
        tap(data => {
            if (data.result.formUrl) {
                if (data.payAmount) {
                    this.LOCAL_STORAGE.setValue(Common.ELocalStorageKey.PayAmount, data.payAmount);
                }
                window.location.href = data.result.formUrl;
            }
        })
    );

}
