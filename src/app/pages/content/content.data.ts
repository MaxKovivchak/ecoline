import { Content, Select } from '../../shared/models';

export const transactionTableSelect: Select.IOption<Content.ETransactionType>[] = [
  {
    id: 1,
    title: 'Все операции',
    type: null,
    isSelect: true
  },
  {
    id: 2,
    title: 'Начисления',
    type: Content.ETransactionType.Bill,
    isSelect: false
  },
  {
    id: 3,
    title: 'Оплата',
    type: Content.ETransactionType.Pay,
    isSelect: false
  }
];
