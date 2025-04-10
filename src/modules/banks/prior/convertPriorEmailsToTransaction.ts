import format from 'date-fns/format';
import { v4 as uuidv4 } from 'uuid';
import { getExchangeRates } from '~modules/nbrb/api';
import { ITransaction } from '~modules/transactions/types';
import { USER_UUID } from '~modules/emails-import/import-from-emails';
import { ParsedTransaction } from '~modules/emails-import/types';

export const convertPriorEmailsToTransaction = async (
  parsedTransactions: ParsedTransaction[]
): Promise<ITransaction[]> => {
  const startDate = parsedTransactions[0].date;
  const endDate = format(new Date(), 'yyyy-MM-dd');

  const exchangeRates = await getExchangeRates(startDate, endDate);

  return parsedTransactions.map(
    ({ date, currency, amount, description, bank, originalCsvRow }) => {
      const exchangeRate = exchangeRates.find((rate) => {
        const rateDate = rate.Date.split('T')[0];
        return rateDate === date;
      });

      if (!exchangeRate) {
        throw new Error('Exchange rate not found');
      }

      const amountInUsd =
        currency === 'USD'
          ? amount
          : Number((amount / exchangeRate.Cur_OfficialRate).toFixed(2));

      return {
        uuid: uuidv4(),
        userId: USER_UUID,
        date,
        currency,
        amount,
        amountInUsd,
        bank,
        description,
        originalCsvRow,
      };
    }
  );
};

