import { parse } from 'papaparse';
import { ParsedFileRow } from '../types';
import { isNumeric, stringPriceToNumber } from 'src/utils';
import parseDate from 'date-fns/parse';
import isDateValid from 'date-fns/isValid';
import format from 'date-fns/format';
import { v4 as uuidv4 } from 'uuid';

import { ExchangeRate, getExchangeRates } from '~modules/nbrb/api';
import { ParsedTransaction } from '~modules/transactions/types';

import { Banks } from 'src/constants';

const isPriorRowValid = (row: string[]): boolean => {
  const date = row[0];
  const description = row[1];
  const amount = row[2] && stringPriceToNumber(row[2]);
  const parsedDate = parseDate(date, 'dd.MM.yyyy HH:mm:ss', new Date());

  if (!isDateValid(parsedDate)) {
    return false;
  }
  if (!isNumeric(amount)) {
    return false;
  }
  if (!description) {
    return false;
  }
  return true;
};

const convertPriorRowToTransaction = (
  row: ParsedFileRow,
  exchangeRates: ExchangeRate[]
): ParsedTransaction => {
  const date = format(
    parseDate(row[0], 'dd.MM.yyyy HH:mm:ss', new Date()),
    'yyyy-MM-dd'
  );
  const currency = row[3];
  const amount = stringPriceToNumber(row[2]);
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
    date,
    currency,
    description: row[1],
    amount,
    amountInUsd,
    bank: Banks.prior,
    originalCsvRow: JSON.stringify(row),
  };
};

export const convertPriorFileToTransactions = async (
  file: File
): Promise<ParsedTransaction[]> => {
  const text = await file.text();
  const rows = parse<ParsedFileRow>(text, {}).data;

  const filteredRows = rows.filter(isPriorRowValid);

  const startDate = format(
    parseDate(filteredRows[0][0], 'dd.MM.yyyy HH:mm:ss', new Date()),
    'yyyy-MM-dd'
  );
  const endDate = format(
    parseDate(
      filteredRows[filteredRows.length - 1][0],
      'dd.MM.yyyy HH:mm:ss',
      new Date()
    ),
    'yyyy-MM-dd'
  );

  const exchangeRates = await getExchangeRates(startDate, endDate);

  const transactions = filteredRows.map((row) => {
    return convertPriorRowToTransaction(row, exchangeRates);
  });

  return transactions;
};
