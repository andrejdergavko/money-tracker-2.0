import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { prisma } from '~lib/prisma';

import { authOptions } from './auth/[...nextauth]';

export type AddTransactionArgsT = {
  userId: string;
  date: string;
  currency: string;
  description?: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  categoryUuid?: string;
  originalCsvRow: string;
};

export type AddTransactionsArgsT = AddTransactionArgsT[];

export type EditTransactionsArgsT = {
  uuids: string[];
  fields: {
    date?: string;
    currency?: string;
    description?: string;
    amount?: number;
    amountInUsd?: number;
    bank?: string;
    categoryUuid?: string;
    originalCsvRow?: string;
  };
};

export type DeleteTransactionsArgsT = string[];

export default async function transactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return res.status(401).send({ message: 'User is not authenticated' });
  }

  switch (req.method) {
    case 'GET': {
      // get transactions
      try {
        const transactions = await prisma.transaction.findMany({
          where: {
            userId: userId,
          },
          include: {
            category: true,
          },
        });

        return res.status(200).json(transactions);
      } catch (error) {
        console.error('get transactions error', error);
        return res.status(500).json(error);
      }
    }
    case 'POST': {
      // create new transactions
      try {
        const newTransactions: AddTransactionsArgsT = req.body.map(
          (item: AddTransactionArgsT) => ({
            ...item,
            userId,
          })
        );

        const currentUserTransactions = await prisma.transaction.findMany({
          where: {
            userId,
          },
          select: {
            originalCsvRow: true,
          },
        });

        const uniqueTransactions = newTransactions.filter((transaction) => {
          const isTransactionUnique = !currentUserTransactions.some(
            (item) => item.originalCsvRow === transaction.originalCsvRow
          );

          return isTransactionUnique;
        });

        await prisma.transaction.createMany({
          data: [...uniqueTransactions],
        });

        return res.status(200).send({ success: true });
      } catch (error) {
        console.error('create new transactions error', error);
        return res.status(500).json(error);
      }
    }
    case 'PUT': {
      // update transactions
      try {
        const { uuids, fields }: EditTransactionsArgsT = req.body;

        await prisma.transaction.updateMany({
          where: {
            userId,
            uuid: {
              in: uuids,
            },
          },
          data: {
            ...fields,
          },
        });

        return res.status(200).send({ success: true });
      } catch (error) {
        console.error('update transactions error', error);
        return res.status(500).json(error);
      }
    }
    case 'DELETE': {
      // delete transactions
      try {
        const uuids: DeleteTransactionsArgsT = req.body;

        await prisma.transaction.deleteMany({
          where: {
            userId,
            uuid: {
              in: uuids,
            },
          },
        });

        return res.status(200).send({ success: true });
      } catch (error) {
        console.error('delete transactions error', error);
        return res.status(500).json(error);
      }
    }
    default:
      res.status(405).end();
      return;
  }
}
