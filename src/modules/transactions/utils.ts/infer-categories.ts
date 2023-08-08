import { ITransaction, ParsedTransaction } from '../types';

export const inferCategories = (
  newTransactions: ParsedTransaction[],
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
