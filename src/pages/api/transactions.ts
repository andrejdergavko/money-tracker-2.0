import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase-client';

export default async function transactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*, category:categories (*)');

  res.status(200).json(transactions);
}
