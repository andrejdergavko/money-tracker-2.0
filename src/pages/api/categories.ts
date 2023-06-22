import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { prisma } from '~lib/prisma';

import { authOptions } from './auth/[...nextauth]';

export default async function categories(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).send({ message: 'User is not authenticated' });
  }

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
