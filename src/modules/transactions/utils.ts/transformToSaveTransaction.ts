import { omit } from 'lodash';
import { TransactionToSave, TransactionWithoutUuid } from '../types';

export const transformToSaveTransactions = (
  transaction: TransactionWithoutUuid[]
): TransactionToSave[] => {
  return transaction.map((transaction) => ({
    ...omit(transaction, ['category']),
    categoryUuid: transaction.category?.uuid,
  }));
};

