import { Action } from '@ngrx/store';
import { Content } from '../../shared/models';

export enum EType {
    GetTransactions = '[Content] Get Transactions',
    GetTransactionsSuccess = '[Content] Get Transactions Success',
    GetTransactionsError = '[Content] Get Transactions Error',

    GetAgreement = '[Content] Get Agreement',

    GetEPDReport = '[Content] Get Report EPD',
    GetEPDReportSuccess = '[Content] Get Report EPD Success',
    GetEPDReportError = '[Content] Get Report EPD Error',

    GetReconciliationReport = '[Content] Get Reconciliation Report',
    GetReconciliationReportSuccess = '[Content] Get Reconciliation Report Success',
    GetReconciliationReportError = '[Content] Get Reconciliation Report Error',

    ClearReport = '[Content] Clear Report',

    GetBalance = '[Content] Get Balance',
    GetBalanceSuccess = '[Content] Get Balance Success',
    GetBalanceError = '[Content] Get Balance Error',

    GetStartDate = '[Content] Get Start Date',
    GetStartDateSuccess = '[Content] Get Start Date Success',
    GetStartDateError = '[Content] Get Start Date Error',

    Pay = '[Content] Pay',
    PaySuccess = '[Content] Pay Success',
    PayError = '[Content] Pay Error',
}

export class GetTransactions implements Action {
    readonly type = EType.GetTransactions;

    constructor(public transactionType: Content.ETransactionType = null, public isLoadMore: boolean = false) {}
}

export class GetTransactionsSuccess implements Action {
    readonly type = EType.GetTransactionsSuccess;

    constructor(public transactions: Content.ITransaction[], public isLoadMore: boolean = false) {}
}

export class GetTransactionsError implements Action {
    readonly type = EType.GetTransactionsError;

    constructor(public error: any) {}
}

export class GetEPDReport implements Action {
    readonly type = EType.GetEPDReport;

    constructor(public dateId: number) {}
}

export class GetAgreement implements Action {
    readonly type = EType.GetAgreement;

    constructor() {}
}

export class GetEPDReportSuccess implements Action {
    readonly type = EType.GetEPDReportSuccess;

    constructor(public link: string) {}
}

export class GetEPDReportError implements Action {
    readonly type = EType.GetEPDReportError;

    constructor(public error: any) {}
}

export class GetReconciliationReport implements Action {
    readonly type = EType.GetReconciliationReport;

    constructor(public date: Content.IReconciliationDatePeriodIds) {}
}

export class GetReconciliationReportSuccess implements Action {
    readonly type = EType.GetReconciliationReportSuccess;

    constructor(public link: string) {}
}

export class GetReconciliationReportError implements Action {
    readonly type = EType.GetReconciliationReportError;

    constructor(public error: any) {}
}

export class ClearReport implements Action {
    readonly type = EType.ClearReport;
}

export class GetBalance implements Action {
    readonly type = EType.GetBalance;
}

export class GetBalanceSuccess implements Action {
    readonly type = EType.GetBalanceSuccess;

    constructor(public data: Content.IBalance) {}
}

export class GetBalanceError implements Action {
    readonly type = EType.GetBalanceError;

    constructor(public error: any) {}
}

export class Pay implements Action {
    readonly type = EType.Pay;

    constructor(public data: Content.IPay) {}
}

export class PaySuccess implements Action {
    readonly type = EType.PaySuccess;

    constructor(public result: Content.IPaySuccess, public payAmount: number = null) {}
}

export class PayError implements Action {
    readonly type = EType.PayError;

    constructor(public error: Content.IPayError) {}
}

export class GetStartDate implements Action {
    readonly type = EType.GetStartDate;
}

export class GetStartDateSuccess implements Action {
    readonly type = EType.GetStartDateSuccess;

    constructor(public start: Content.IStart) {}
}

export class GetStartDateError implements Action {
    readonly type = EType.GetStartDateError;

    constructor(public error: any) {}
}

export type Actions =
    | GetTransactions
    | GetTransactionsSuccess
    | GetTransactionsError

    | GetEPDReport
    | GetEPDReportSuccess
    | GetEPDReportError

    | GetReconciliationReport
    | GetReconciliationReportSuccess
    | GetReconciliationReportError

    | ClearReport

    | GetBalance
    | GetBalanceSuccess
    | GetBalanceError

    | Pay
    | PaySuccess
    | PayError

    | GetStartDate
    | GetStartDateSuccess
    | GetStartDateError
    ;
