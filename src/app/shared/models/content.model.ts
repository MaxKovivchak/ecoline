export interface ITransaction {
    amount: number;
    datetime: string;
    name: string;
    type: ETransactionType;
}

export enum ETransactionType {
    Bill = 'bill',
    Pay = 'pay',
}

export interface IReport {
    link: string;
}

export interface IReconciliationDatePeriodIds {
    dateFromId: number;
    dateToId: number;
}

export interface IReconciliationDatePeriod {
    dateFrom: string;
    dateTo: string;
}

export interface IBalance {
    datetime: string;
    amount: number;
}

export interface IPay {
    payAmount: number;
    payDescription: string;
    token?: string;
}

export interface IPaySuccess {
    formUrl: string;
    orderId: string;
    error?: string;
}

export enum EPaymentResult {
    Success = 'success',
    Error = 'error',
}

export interface IPaymentQueryParams {
    orderId?: number;
}

export interface IPayError {
    error: string;
}

export interface IStart {
    datetime: string;
    quantity: number;
}

export class DateRangeOption {
    constructor(
        public id: number,
        public title: string,
        public datetime: string,
        public isSelect: boolean = false,
    ) { }
}
