import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@lib/supabase-client';

export default async function transaction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'DELETE': {
      // delete transaction
      const { transactionUuid } = req.query;

      await supabase
        .from('transactions')
        .delete()
        .match({ uuid: transactionUuid });

      res.status(200).end();
      return;
    }
    default:
      res.status(405).end();
      return;
  }
}
