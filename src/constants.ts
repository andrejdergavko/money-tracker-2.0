import type { IBank, ICurrency } from 'src/types';

export enum Pages {
  transactions = 'transactions',
  statistics = 'statistics',
  import = 'import',
}

export enum Routes {
  transactions = '/',
  statistics = '/statistics',
  import = '/import',
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

export enum Banks {
  prior = 'prior',
}

export const BANK_OPTIONS: IBank[] = [
  {
    id: Banks.prior,
    label: 'Prior bank',
  },
];

export enum MillisecondsBy {
  Day = 86400000,
  Weak = Day * 7,
  Month = Day * 30,
  Year = Day * 365,
}
