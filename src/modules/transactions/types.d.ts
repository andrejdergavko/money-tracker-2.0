import { ICategory } from '~modules/categories/types';

export interface ITransaction {
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

export type TransactionWithoutUserId = Omit<ITransaction, 'userId'>;

export type TransactionWithoutUuid = Omit<ITransaction, 'uuid'>;

export type TransactionToSave = Omit<ITransaction, 'category'> & {
  categoryUuid?: string | null;
};

