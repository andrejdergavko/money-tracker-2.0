import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~lib/prisma';

export type AddTransactionArgsT = {
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
  switch (req.method) {
    case 'GET': {
      // get transactions
      try {
        const transactions = await prisma.transaction.findMany();

        return res.status(200).json(transactions);
      } catch (error) {
        console.error('get transactions error', error);
        return res.status(500).json(error);
      }
    }
    case 'POST': {
      // create new transactions
      try {
        const newTransactions: AddTransactionsArgsT = req.body;

        const currentTransactions = await prisma.transaction.findMany({
          select: {
            originalCsvRow: true,
          },
        });

        const uniqueTransactions = newTransactions.filter((transaction) => {
          const isTransactionUnique = !currentTransactions.some(
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
