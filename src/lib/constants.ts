import type { BankT, CurrencyT } from '../types/entities';

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

export const BANKS: BankT[] = [
  {
    id: 'priorbanc',
    label: 'Prior bank',
  },
  {
    id: 'ipko',
    label: 'iPKO',
  },
];

export const CURRENCIES: CurrencyT[] = [
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
