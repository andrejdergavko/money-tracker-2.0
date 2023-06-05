import type { IBank, ICurrency } from '../types/entities';
import { Pages, Routes, Banks } from './enums';

export const DAY_IN_MILLISECONDS = 86400000;
export const WEAK_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 7;
export const MONTH_IN_MILLISECONDS = DAY_IN_MILLISECONDS * 30;

export const PAGE_NAMES: { [key in Pages]: string } = {
  [Pages.transactions]: 'Transactions',
  [Pages.statistics]: 'Statistics',
  [Pages.import]: 'Transaction import',
};

export const PAGE_NAMES_BY_ROUTE: { [key: string]: string } = {
  [Routes.transactions]: PAGE_NAMES[Pages.transactions],
  [Routes.statistics]: PAGE_NAMES[Pages.statistics],
  [Routes.import]: PAGE_NAMES[Pages.import],
};

export const BANK_OPTIONS: IBank[] = [
  {
    id: Banks.prior,
    label: 'Prior bank',
  },
  {
    id: Banks.ipko,
    label: 'iPKO',
  },
];

export const CURRENCIES: ICurrency[] = [
  {
    id: 'BYN',
    label: 'Belarusian ruble',
    code: 'BYN',
  },
  {
    id: 'PLN',
    label: 'Polish zloty',
    code: 'PLN',
  },
];

export const SUMMARIZE_BY_OPTIONS = [
  {
    label: 'Day',
    id: DAY_IN_MILLISECONDS,
  },
  {
    label: 'Weak',
    id: WEAK_IN_MILLISECONDS,
  },
  {
    label: 'Month',
    id: MONTH_IN_MILLISECONDS,
  },
  {
    label: 'All time',
    id: MONTH_IN_MILLISECONDS * 1000,
  },
];
