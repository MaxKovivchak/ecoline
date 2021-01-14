import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthAction, ContentAction, FromContent, FromUser, UserAction } from '../../store';
import { Observable, Subject } from 'rxjs';
import { Common, Content, Select, User } from '../../shared/models';
import { transactionTableSelect } from './content.data';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
    selector: 'app-content',
    templateUrl: './content.container.html'
})
// tslint:disable-next-line:component-class-suffix
export class ContentContainer implements OnInit {

    payAmount = 100;
    payDescription: string;

    profile$: Observable<User.IProfile>;
    transactions$: Observable<Content.ITransaction[]>;
    transactionsType$: Observable<Content.ETransactionType>;
    transactionsQuantity$: Observable<number>;
    balance$: Observable<Content.IBalance>;
    dateRange$: Observable<Content.DateRangeOption[]>;
    payResultError$: Observable<string>;

    tableSelect = transactionTableSelect;

    dateRange: Content.DateRangeOption[];
    dateRangeReconciliationEndDefault: Content.DateRangeOption[];
    dateRangeReportEPDDefault: Content.DateRangeOption[];
    transactionsType: Content.ETransactionType;
    reportEPDDateId: number;
    reconciliationDatePeriod: Content.IReconciliationDatePeriodIds = {
        dateFromId: null,
        dateToId: null,
    };
    error: Common.IResultError;

    private destroy$ = new Subject<any>();

    get isAllowPay(): boolean {
        return !!(this.payAmount && this.payAmount > 99) && !!this.payDescription;
    }

    get notAllowedReconciliationStartIds(): number[] {
        let dateIds = [];
        if (this.dateRange) {
            const dateIdx = this.dateRange.findIndex(d => d.id === this.reconciliationDatePeriod.dateToId);
            dateIds = this.dateRange.slice(dateIdx).map(d => d.id);
        }
        return [this.reconciliationDatePeriod.dateToId, ...dateIds];
    }

    get notAllowedReconciliationEndIds(): number[] {
        let dateIds = [];
        if (this.dateRange) {
            const dateIdx = this.dateRange.findIndex(d => d.id === this.reconciliationDatePeriod.dateFromId);
            dateIds = this.dateRange.slice(0, dateIdx).map(d => d.id);
        }
        return [this.reconciliationDatePeriod.dateFromId, ...dateIds];
    }

    constructor(
        private STORE: Store,
        private LOCAL_STORAGE: LocalStorageService
    ) {}

    ngOnInit(): void {
        this.STORE.dispatch(new UserAction.GetProfile());
        this.STORE.dispatch(new ContentAction.GetTransactions());
        this.STORE.dispatch(new ContentAction.GetBalance());
        this.STORE.dispatch(new ContentAction.GetStartDate());

        this.transactions$ = this.STORE.select(FromContent.Transactions);
        this.transactionsQuantity$ = this.STORE.select(FromContent.TransactionsQuantity);
        this.transactionsType$ = this.STORE.select(FromContent.TransactionsType);
        this.balance$ = this.STORE.select(FromContent.Balance);
        this.payResultError$ = this.STORE.select(FromContent.PayResultError);
        this.profile$ = this.STORE
            .select(FromUser.User)
            .pipe(
                filter(user => !!user),
                tap(user => this.payDescription = user.login)
            );
        this.dateRange$ = this.STORE
            .select(FromContent.DateRange)
            .pipe(
                filter(dateRange => !!dateRange),
                tap(dateRange => {
                    this.dateRange = dateRange;
                    this.dateRangeReconciliationEndDefault = dateRange.map((date, idx, arr) => {
                        const copyDate = Object.assign({}, date);
                        copyDate.isSelect = idx === (arr.length - 1);
                        return copyDate;
                    }).reverse();
                    this.dateRangeReportEPDDefault = [...this.dateRangeReconciliationEndDefault];
                    this.reportEPDDateId = this.dateRangeReportEPDDefault[0].id;
                    this.reconciliationDatePeriod.dateToId = dateRange[dateRange.length - 1].id;
                    this.reconciliationDatePeriod.dateFromId = dateRange[0].id;
                }),
                map(dateRange => [...dateRange].reverse())
            );

        this.STORE
            .select(FromContent.ReportEPDLink)
            .pipe(
                filter(filePath => !!filePath),
                takeUntil(this.destroy$)
            )
            .subscribe(filePath => this.downloadFile(filePath));

        this.STORE
            .select(FromContent.ReportReconciliationLink)
            .pipe(
                filter(filePath => !!filePath),
                takeUntil(this.destroy$)
            )
            .subscribe(filePath => this.downloadFile(filePath));

        this.STORE
            .select(FromContent.Error)
            .pipe(takeUntil(this.destroy$))
            .subscribe(error => this.error = error);
    }

    pay(): void {
        this.STORE.dispatch(new ContentAction.Pay({
            payAmount: this.payAmount,
            payDescription: this.payDescription,
        }));
    }

    agreement(): void {
        this.STORE.dispatch(new ContentAction.GetAgreement());
    }

    onChangeProfile(e: User.IProfileChangeEvent) {
        this.STORE.dispatch(new UserAction.UpdateProfile(e));
    }

    onChangeTableSelection(e: Select.IOption<Content.ETransactionType>): void {
        this.transactionsType = e.type;
        this.STORE.dispatch(new ContentAction.GetTransactions(e.type, false));
    }

    onChangeReportEPDSelection(e: Select.IOption<unknown>): void {
        this.reportEPDDateId = e.id;
    }

    onChangeReconciliationStartSelection(e: Select.IOption<unknown>): void {
        this.reconciliationDatePeriod = {
            dateFromId: e.id,
            dateToId: this.reconciliationDatePeriod.dateToId
        };
    }

    onChangeReconciliationEndSelection(e: Select.IOption<unknown>): void {
        this.reconciliationDatePeriod = {
            dateFromId: this.reconciliationDatePeriod.dateFromId,
            dateToId: e.id
        };
    }

    onLogout() {
        this.STORE.dispatch(new AuthAction.Logout());
    }

    getEPDReport() {
        this.STORE.dispatch(new ContentAction.GetEPDReport(this.reportEPDDateId));
    }

    getReportReconciliation() {
        this.STORE.dispatch(new ContentAction.GetReconciliationReport(this.reconciliationDatePeriod));
    }

    onLoadNextPage() {
        if (this.error) { return; }
        this.STORE.dispatch(new ContentAction.GetTransactions(this.transactionsType, true));
    }

    private downloadFile(filePath: string): void {

        const id = this.LOCAL_STORAGE.getValue(Common.ELocalStorageKey.XId);
        const token = this.LOCAL_STORAGE.getValue(Common.ELocalStorageKey.Token);

        const filePathArr: string[] = filePath.split('/');
        const url = `${environment.apiUrl}/reportsave/${filePathArr[filePathArr.length - 1]}/?id=${id}&token${token}`;
        const link: HTMLAnchorElement = document.createElement('a');

        link.style.display = 'none';
        link.href = url;
        link.download = 'download';
        document.body.appendChild(link);
        link.click();
        link.remove();

        this.STORE.dispatch(new ContentAction.ClearReport());
    }
}
