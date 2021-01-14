import { IAppState } from '../state/app.index';
import { createSelector } from '@ngrx/store';

const selectContent = (state: IAppState) => state.content;

export const Transactions = createSelector(
    selectContent,
    state => state.transactions
);

export const TransactionsQuantity = createSelector(
    selectContent,
    state => state.transactionsQuantity
);

export const TransactionsType = createSelector(
    selectContent,
    state => state.transactionsType
);

export const TransactionOffset = createSelector(
    selectContent,
    state => state.offset
);

export const ReportEPDLink = createSelector(
    selectContent,
    state => state.reportEPDLink
);

export const ReportReconciliationLink = createSelector(
    selectContent,
    state => state.reportReconciliationLink
);

export const Balance = createSelector(
    selectContent,
    state => state.balance
);

export const DateRange = createSelector(
    selectContent,
    state => state.dateRange
);

export const PayResultError = createSelector(
    selectContent,
    state => state.payResultError
);

export const Error = createSelector(
    selectContent,
    state => state.error
);
