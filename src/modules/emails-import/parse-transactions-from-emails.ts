import { format } from 'date-fns';
import { Banks } from '../../constants';
import { ParsedEmail, ParsedTransaction } from './types';

export const parsTransactionsFromEmails = (
  emails: ParsedEmail[]
): ParsedTransaction[] => {
  return emails
    .map((email) => {
      if (!email.text) return null;

      const smsRegex =
        /Priorbank\. Karta (\d\*+\d+) (\d{2}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})\. Oplata (\d+\.\d{2}) (\w{3})\. (.+?)\s*Spravka:/;
      const match = email.text.match(smsRegex);

      if (!match) return null;

      const [_, __, dateStr, timeStr, amountStr, currency, description] = match;

      const [day, month, year] = dateStr.split('-');
      const fullYear = `20${year}`;
      const date = format(
        new Date(`${fullYear}-${month}-${day}T${timeStr}`),
        'yyyy-MM-dd'
      );

      return {
        bank: Banks.prior,
        date,
        amount: parseFloat(amountStr),
        currency,
        description: description.trim(),
        originalCsvRow: email.text,
      };
    })
    .filter(
      (transaction): transaction is ParsedTransaction => transaction !== null
    );
};

