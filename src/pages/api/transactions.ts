import type { NextApiRequest, NextApiResponse } from 'next';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

import { supabase } from '../../lib/supabase-client';
import { Database } from '../../types/supabase';

export type InsertTransactionT =
  Database['public']['Tables']['transactions']['Insert'];

export type AddTransactionsArgsT = {
  date: string;
  currency: string;
  description?: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  categoryUuid?: string;
  originalCsvRow: string;
}[];

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
        const { data: transactions } = await supabase
          .from('transactions')
          .select('*, category:categories (*)')
          .throwOnError();

        return res
          .status(200)
          .json(transactions && camelcaseKeys(transactions));
      } catch (error) {
        console.error('get transactions error', error);
        return res.status(500).json(error);
      }
    }
    case 'POST': {
      // create new transactions
      try {
        const newTransactions: AddTransactionsArgsT = req.body;

        const { data } = await supabase
          .from('transactions')
          .select('original_csv_row')
          .in(
            'date',
            newTransactions.map((item) => item.date)
          )
          .throwOnError();

        const existingCsvRows = (data || []).map(
          (item) => item.original_csv_row
        );

        const uniqueTransactions = newTransactions.filter((transaction) => {
          const isTransactionUnique = !existingCsvRows.includes(
            transaction.originalCsvRow
          );
          return isTransactionUnique;
        });

        await supabase
          .from('transactions')
          .insert<InsertTransactionT>(snakecaseKeys(uniqueTransactions))
          .throwOnError();

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

        await supabase
          .from('transactions')
          .update(snakecaseKeys(fields))
          .in('uuid', uuids)
          .throwOnError();

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

        await supabase
          .from('transactions')
          .delete()
          .in('uuid', uuids)
          .throwOnError();
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
