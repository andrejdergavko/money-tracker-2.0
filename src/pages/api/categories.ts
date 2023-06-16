import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~lib/prisma';

export default async function categories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      // get categories
      try {
        const categories = await prisma.category.findMany();

        return res.status(200).json(categories);
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
