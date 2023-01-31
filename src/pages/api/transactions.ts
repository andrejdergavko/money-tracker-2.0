import type { NextApiRequest, NextApiResponse } from 'next';
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
  categoryId?: number;
}[];

export default async function transactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      // create new transactions
      try {
        const body: AddTransactionsArgsT = req.body;
        const newTransactions = body.map(
          ({
            date,
            currency,
            description,
            amount,
            amountInUsd,
            bank,
            categoryId,
          }) => {
            return {
              date,
              currency,
              description,
              amount,
              amount_in_usd: amountInUsd,
              bank,
              category_id: categoryId,
            };
          }
        );

        await supabase
          .from('transactions')
          .insert<InsertTransactionT>(newTransactions)
          .throwOnError();

        return res.status(200).send({ success: true });
      } catch (error) {
        console.error('create new transactions error', error);
        return res.status(500).json(error);
      }
    }
    case 'GET': {
      // get transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('*, category:categories (*)');

      res.status(200).json(transactions);
      return;
    }
    default:
      res.status(405).end();
      return;
  }
}
