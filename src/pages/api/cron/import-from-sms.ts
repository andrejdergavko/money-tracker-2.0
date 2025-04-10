import { NextApiRequest, NextApiResponse } from 'next';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import { importFromSms } from '~modules/sms-import/import-from-sms';

const DAY_IN_MILLISECONDS = 24 * 3600 * 1000;

// ozzp ykyq fvgv auwi

// if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
//   throw new Error('GMAIL_USER and GMAIL_PASSWORD environment variables are required');
// }

// Конфигурация для подключения к Gmail
const config = {
  imap: {
    // user: process.env.GMAIL_USER,
    user: 'andrejdergavko@gmail.com',
    // password: process.env.GMAIL_PASSWORD,
    password: 'ozzp ykyq fvgv auwi',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000,
  },
};

interface ParsedEmail {
  subject?: string;
  from?: string;
  text?: string;
}

// const fetchEmails = async (): Promise<ParsedEmail[]> => {
//   try {
//     const connection = await imaps.connect(config);

//     // const boxes = await connection.getBoxes();
//     // console.log('Available mailboxes:', boxes);

//     await connection.openBox('Счета');

//     const yesterday = new Date();
//     yesterday.setTime(Date.now() - DAY_IN_MILLISECONDS * 2);

//     const searchCriteria = [
//       'ALL',
//       ['SINCE', yesterday.toISOString()],
//       ['FROM', 'sms-extra@mts.by'],
//       // ['TEXT', 'Priorbank. Karta'],
//     ];

//     const messages = await connection.search(searchCriteria, {
//       bodies: [''], // all message
//       markSeen: false,
//     });

//     const emails = await Promise.all(
//       messages.map(async (message) => {
//         const part = message.parts.find((part) => part.which === '');
//         if (!part) return null;
//         const parsed = await simpleParser(part.body);
//         return {
//           subject: parsed.subject,
//           from: Array.isArray(parsed.from)
//             ? parsed.from[0].text
//             : parsed.from?.text,
//           text: parsed.text,
//         };
//       })
//     );

//     await connection.end();

//     return emails.filter((email) => email !== null);
//   } catch (error) {
//     console.error('Error in fetchEmails:', error);
//     throw error;
//   }
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('Starting email fetch...');
    const emails = await importFromSms();
    console.log('Parsed emails:', JSON.stringify(emails, null, 2));
    console.log(`Fetched ${emails.length} emails`);
    res.status(200).json({ success: true, emailsCount: emails.length });
  } catch (error: any) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

