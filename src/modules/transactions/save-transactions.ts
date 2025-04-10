import { prisma } from '~modules/prisma/prisma-client';
import { ITransaction } from './types';

export const saveTransactions = async (
  userId: string,
  newTransactions: ITransaction[]
) => {
  const allUsersTransactions = await prisma.transaction.findMany({
    where: { userId },
    select: { originalCsvRow: true },
  });

  const uniqueTransactions = newTransactions.filter((transaction) => {
    const isTransactionUnique = !allUsersTransactions.some(
      (item) => item.originalCsvRow === transaction.originalCsvRow
    );
    return isTransactionUnique;
  });

  await prisma.transaction.createMany({
    data: uniqueTransactions,
  });
};

