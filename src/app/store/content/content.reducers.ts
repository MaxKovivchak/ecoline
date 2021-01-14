import { ContentAction } from '../index';
import { Common, Content } from '../../shared/models';
import { DateUtils } from '../../shared/utils/date.util';

export interface IContentState {
    transactions: Content.ITransaction[];
    transactionsType: Content.ETransactionType;
    offset: number;
    reportEPDLink: string;
    reportReconciliationLink: string;
    balance: Content.IBalance;
    dateRange: Content.DateRangeOption[];
    payResultError: string;
    transactionsQuantity: number;
    error: Common.IResultError;
}

export const initialContentState: IContentState = {
    transactions: null,
    transactionsType: null,
    offset: 0,
    reportEPDLink: null,
    reportReconciliationLink: null,
    balance: {
        datetime: null,
        amount: null
    },
    transactionsQuantity: null,
    payResultError: null,
    dateRange: null,
    error: null
};

export function contentReducer(state: IContentState = initialContentState, action: ContentAction.Actions): IContentState {
    switch (action.type) {
        case ContentAction.EType.GetTransactions: {
            let offset = state.offset;
            if (action.isLoadMore) {
                offset++;
            }
            if (action.transactionType !== state.transactionsType) {
                offset = initialContentState.offset;
            }
            return {
                ...state,
                offset,
                transactionsType: action.transactionType
            };
        }
        case ContentAction.EType.GetTransactionsSuccess: {
            let transactions = action.transactions;
            if (action.isLoadMore) {
                transactions = [...state.transactions, ...transactions];
            }
            return {
                ...state,
                transactions,
                error: null
            };
        }
        case ContentAction.EType.GetTransactionsError: {
            return {
                ...state,
                error: action.error.error
            };
        }
        case ContentAction.EType.GetEPDReportSuccess: {
            return {
                ...state,
                reportEPDLink: action.link
            };
        }
        case ContentAction.EType.GetReconciliationReportSuccess: {
            return {
                ...state,
                reportReconciliationLink: action.link
            };
        }
        case ContentAction.EType.ClearReport: {
            return {
                ...state,
                reportReconciliationLink: null,
                reportEPDLink: null
            };
        }
        case ContentAction.EType.GetBalanceSuccess: {
            const balance = {
                datetime: action.data.datetime,
                amount: -action.data.amount,
            };
            return {
                ...state,
                balance
            };
        }
        case ContentAction.EType.GetStartDateSuccess: {

            if (!action.start) return ;

            const newDate = DateUtils.getDataFromDate(new Date());
            const newDateString = `${ newDate.day }.${ newDate.month + 1 }.${ newDate.year }`;
            const dateRangeString = DateUtils.dateRange(action.start.datetime.split(' ')[0], newDateString);
            const dateRange = dateRangeString.map((date, idx) => {
                const dateArr = date.split('.');
                return new Content.DateRangeOption(
                    Math.floor(Math.random() * Math.floor(999)),
                    `${ DateUtils.monthsRU[+dateArr[1] - 1] } ${ dateArr[dateArr.length - 1] }`,
                    date
                );
            });
            dateRange[0].isSelect = true;

            const transactionsQuantity = action.start.quantity;

            return {
                ...state,
                dateRange,
                transactionsQuantity,
                error: null
            };
        }
        case ContentAction.EType.PaySuccess: {
            return {
                ...state,
                payResultError: action.result.error ? action.result.error : null
            };
        }
        default:
            return state;
    }
}
