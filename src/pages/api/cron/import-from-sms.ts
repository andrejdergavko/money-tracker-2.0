import { NextApiRequest, NextApiResponse } from 'next';
import { importFromEmails } from '~modules/emails-import/import-from-emails';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const transactions = await importFromEmails();
    res.status(200).json({ success: true, transactions: transactions });
  } catch (error: any) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

