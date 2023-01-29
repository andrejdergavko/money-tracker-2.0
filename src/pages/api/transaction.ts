import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase-client';

export default async function transaction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      // create transaction
      const {
        date,
        currency,
        description,
        amount,
        amountInUsd,
        bank,
        categoryId,
      } = req.body;

      await supabase.from('transactions').insert([
        {
          date,
          currency,
          description,
          amount,
          amount_in_usd: amountInUsd,
          bank,
          category_id: categoryId,
        },
      ]);

      res.status(200).end();
      return;
    }
    case 'DELETE': {
      // delete transaction
      const { transactionId } = req.query;

      await supabase.from('transactions').delete().match({ id: transactionId });

      res.status(200).end();
      return;
    }
    default:
      res.status(405).end();
      return;
  }
}
