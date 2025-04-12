import { prisma } from '~modules/prisma/prisma-client';
import { convertPriorEmailsToTransaction } from '~modules/banks/prior/convertPriorEmailsToTransaction';
import { saveTransactions } from '~modules/transactions/save-transactions';
import { fetchEmails } from './fetch-emails';
import { parsTransactionsFromEmails } from './parse-transactions-from-emails';
import { addCategories } from '~modules/transactions/utils.ts/substitute-categories';
import {
  ITransaction,
  TransactionWithoutUuid,
} from '~modules/transactions/types';
import { transformToSaveTransactions } from '~modules/transactions/utils.ts/transformToSaveTransaction';
import inferCategories from '~modules/transactions/utils.ts/infer-categories';

export const USER_UUID = 'clup7q7dz0008ow8o3zu6y4bb';

export const importFromEmails = async () => {
  const lastTransaction = await prisma.transaction.findFirst({
    orderBy: { date: 'desc' },
  });

  if (!lastTransaction) throw new Error('No transactions found');

  const emails = await fetchEmails(new Date(lastTransaction.date));

  const parsedTransactions = parsTransactionsFromEmails(emails);

  let transactions = await convertPriorEmailsToTransaction(parsedTransactions);

  const allUserTransactions = (await prisma.transaction.findMany({
    where: { userId: USER_UUID },
    include: { category: true },
  })) as ITransaction[];

  let uniqueTransactions = transactions.filter((transaction) => {
    const isTransactionUnique = !allUserTransactions.some(
      (item) => item.originalCsvRow === transaction.originalCsvRow
    );
    return isTransactionUnique;
  });

  if (allUserTransactions) {
    uniqueTransactions = addCategories<TransactionWithoutUuid>(
      uniqueTransactions,
      allUserTransactions
    );
  }

  uniqueTransactions = await inferCategories(uniqueTransactions);

  await saveTransactions(
    USER_UUID,
    transformToSaveTransactions(uniqueTransactions)
  );

  return uniqueTransactions;
};

