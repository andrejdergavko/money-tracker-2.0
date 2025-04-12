import {
  ITransaction,
  TransactionWithoutUserId,
  TransactionWithoutUuid,
} from '../types';

export const addCategories = <
  T extends TransactionWithoutUserId | TransactionWithoutUuid,
>(
  newTransactions: T[],
  oldTransactions: ITransaction[]
) => {
  return newTransactions.map((newTransaction) => {
    const oldCategory = oldTransactions.find(
      (oldTransaction) =>
        oldTransaction.description === newTransaction.description
    )?.category;

    if (oldCategory) {
      return { ...newTransaction, category: oldCategory };
    }

    return newTransaction;
  });
};

