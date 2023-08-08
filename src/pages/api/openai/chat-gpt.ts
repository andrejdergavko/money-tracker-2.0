import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { createChatCompletion } from '~modules/openai/api-req';

import { authOptions } from '../auth/[...nextauth]';

export default async function chatGPT(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401).send({ message: 'User is not authenticated' });
  }

  switch (req.method) {
    case 'POST': {
      // create chat completion
      try {
        const message: string = req.body;

        const assistantMessage = await createChatCompletion(message);

        return res.status(200).json(assistantMessage);
      } catch (error) {
        console.error('create chat completion error', error);
        return res.status(500).json(error);
      }
    }

    default:
      res.status(405).end();
      return;
  }
}
