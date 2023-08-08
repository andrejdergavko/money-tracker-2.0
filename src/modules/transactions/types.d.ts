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

export type ParsedTransaction = Omit<ITransaction, 'userId'>;
