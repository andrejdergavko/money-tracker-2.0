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
  id: string;
  label: string;
  color: string;
};

export type TransactionT = {
  id: number;
  date: string;
  currency: string;
  description: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  category?: CategoryT;
  originalCsvRow: string;
};
