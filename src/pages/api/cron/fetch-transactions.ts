import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(111111111);
  res.status(200).end('Hello Cron!');
}

