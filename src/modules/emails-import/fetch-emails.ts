import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import { ParsedEmail } from './types';

const config = {
  imap: {
    user: process.env.GMAIL_USER as string,
    password: process.env.GMAIL_PASSWORD as string,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 15000,
  },
};

export const fetchEmails = async (
  lastTransactionDate: Date
): Promise<ParsedEmail[]> => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    throw new Error(
      'GMAIL_USER and GMAIL_PASSWORD environment variables are required'
    );
  }

  try {
    const connection = await imaps.connect(config);

    // const boxes = await connection.getBoxes();
    // console.log('Available mailboxes:', boxes);

    await connection.openBox('Счета');

    const searchDate = new Date(lastTransactionDate);
    searchDate.setDate(searchDate.getDate() - 30);

    const searchCriteria = [
      'ALL',
      ['SINCE', searchDate.toISOString()],
      ['FROM', 'sms-extra@mts.by'],
      ['TEXT', 'Priorbank. Karta'],
    ];

    const messages = await connection.search(searchCriteria, {
      bodies: [''], // all message
      markSeen: false,
    });

    const emails = await Promise.all(
      messages.map(async (message) => {
        const part = message.parts.find((part) => part.which === '');
        if (!part) return null;
        const parsed = await simpleParser(part.body);
        return {
          subject: parsed.subject,
          from: Array.isArray(parsed.from)
            ? parsed.from[0].text
            : parsed.from?.text,
          text: parsed.text,
        };
      })
    );

    await connection.end();

    return (emails as ParsedEmail[]).filter((email) => email !== null);
  } catch (error) {
    console.error('Error in fetchEmails:', error);
    throw error;
  }
};

