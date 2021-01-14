import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Common, Content } from '../../shared/models';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(
        private HTTP: HttpClient,
        private LOCAL_STORAGE: LocalStorageService
    ) { }

    getTransactions(type: Content.ETransactionType, offset: number): Observable<Content.ITransaction[]> {
        const url = type
            ? `${ environment.apiUrl }/transaction/${ type }/${ offset }`
            : `${ environment.apiUrl }/transaction/${ offset }`;

        return this.HTTP
            .get<Common.IResult<Content.ITransaction[]>>(url)
            .pipe(
                map(data => data.result)
            );
    }

    getAgreement(): Observable<Content.IReport> {
        return this.HTTP
            .get<Common.IResult<Content.IReport>>(`${ environment.apiUrl }/dogovor/`)
            .pipe(
                map(data => data.result)
            );
    }

    getReportEPD(date: string): Observable<Content.IReport> {
        return this.HTTP
            .get<Common.IResult<Content.IReport>>(`${ environment.apiUrl }/report/${ date }`)
            .pipe(
                map(data => data.result)
            );
    }

    getReportReconciliation(date: Content.IReconciliationDatePeriod): Observable<Content.IReport> {
        return this.HTTP
            .get<Common.IResult<Content.IReport>>(`${ environment.apiUrl }/report/${ date.dateFrom }/${ date.dateTo }`)
            .pipe(
                map(data => data.result),
            );
    }

    getBalance(): Observable<Content.IBalance> {
        return this.HTTP
            .get<Common.IResult<Content.IBalance>>(`${ environment.apiUrl }/balance`)
            .pipe(
                map(data => data.result)
            );
    }

    pay(data: Content.IPay): Observable<Content.IPaySuccess> {
        const id = this.LOCAL_STORAGE.getValue(Common.ELocalStorageKey.XId);
        return this.HTTP
            .get<Content.IPaySuccess>(`${environment.payUrl}?amount=${data.payAmount}&desc=${data.payDescription}&token=${data.token}&id=${id}`);
    }

    getStartDate(): Observable<Content.IStart> {
        return this.HTTP
            .get<Common.IResult<Content.IStart>>(`${ environment.apiUrl }/transaction`)
            .pipe(
                map(data => data.result)
            );
    }

}
