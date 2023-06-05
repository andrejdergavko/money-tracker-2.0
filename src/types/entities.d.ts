export type BankT = {
  id: string;
  label: string;
};

export type CurrencyT = {
  id: string;
  label: string;
  code: string;
};

export type CategoryT = {
  uuid: string;
  label: string;
  color: string;
};

export type TransactionT = {
  uuid: string;
  date: string;
  currency: string;
  description: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  category?: CategoryT;
  originalCsvRow: string;
};
