export interface IBank {
  id: string;
  label: string;
}

export interface ICurrency {
  id: string;
  label: string;
  code: string;
}

export interface ICategory {
  uuid: string;
  label: string;
  color: string;
}

export interface ITransaction {
  uuid: string;
  userId: string;
  date: string;
  currency: string;
  description: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  category?: ICategory;
  originalCsvRow: string;
}
