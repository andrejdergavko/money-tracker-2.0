import type { NextApiRequest, NextApiResponse } from 'next';
import camelcaseKeys from 'camelcase-keys';

import { supabase } from '~lib/supabase-client';

export default async function categories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      // get categories
      try {
        const { data: categories } = await supabase
          .from('categories')
          .select('*')
          .throwOnError();

        return res.status(200).json(categories && camelcaseKeys(categories));
      } catch (error) {
        console.error('get categories error', error);
        return res.status(500).json(error);
      }
    }

    default:
      res.status(405).end();
      return;
  }
}
