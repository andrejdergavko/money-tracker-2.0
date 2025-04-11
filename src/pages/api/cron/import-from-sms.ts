import { NextApiRequest, NextApiResponse } from 'next';
import { importFromEmails } from '~modules/emails-import/import-from-emails';
import { ITransaction } from '~modules/transactions/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let transactions: ITransaction[] = [];

  if (process.env.NODE_ENV === 'production') {
    console.log('Importing from emails...');
    transactions = await importFromEmails();
    console.log('Import completed:', transactions);
  }

  res.status(200).json({
    success: true,
    message: 'Import completed',
    transactions,
  });
}

