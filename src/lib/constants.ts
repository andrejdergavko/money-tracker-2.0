import type { IBank, ICurrency } from '~types/entities';
import { Pages, Routes, Banks } from './enums';

export enum MillisecondsBy {
  Day = 86400000,
  Weak = Day * 7,
  Month = Day * 30,
  Year = Day * 365,
}

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

export const SUMMARIZE_BY_OPTIONS: { label: string; id: number }[] = [
  {
    label: 'Day',
    id: MillisecondsBy.Day,
  },
  {
    label: 'Weak',
    id: MillisecondsBy.Weak,
  },
  {
    label: 'Month',
    id: MillisecondsBy.Month,
  },
  {
    label: 'All time',
    id: MillisecondsBy.Year,
  },
];
