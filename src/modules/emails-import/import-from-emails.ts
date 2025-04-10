import { prisma } from '~modules/prisma/prisma-client';
import { convertPriorEmailsToTransaction } from '~modules/banks/prior/convertPriorEmailsToTransaction';
import { saveTransactions } from '~modules/transactions/save-transactions';
import { fetchEmails } from './fetch-emails';
import { parsTransactionsFromEmails } from './parse-transactions-from-emails';

export const USER_UUID = 'clup7q7dz0008ow8o3zu6y4bb';

export const importFromEmails = async () => {
  const lastTransaction = await prisma.transaction.findFirst({
    orderBy: { date: 'desc' },
  });

  if (!lastTransaction) throw new Error('No transactions found');

  const emails = await fetchEmails(new Date(lastTransaction.date));

  const parsedTransactions = parsTransactionsFromEmails(emails);

  const transactions = await convertPriorEmailsToTransaction(
    parsedTransactions
  );

  // infer category

  await saveTransactions(USER_UUID, transactions);

  return transactions;
};

