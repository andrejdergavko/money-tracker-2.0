import { parse } from 'papaparse';
import parseDate from 'date-fns/parse';
import format from 'date-fns/format';
import isDateValid from 'date-fns/isValid';
import { v4 as uuidv4 } from 'uuid';

import { Banks, CURRENCIES } from 'src/constants';
import { ParsedTransaction } from '~modules/transactions/types';
import { isNumeric, stringToNumber } from 'src/utils';

type RowT = string[];

const isCurrencyKnown = (currency: string) =>
  CURRENCIES.some((item) => item.code === currency);

const isIpkoRowValid = (row: string[]): boolean => {
  const date = row[0];
  const amount = row[3];
  const currency = row[4];
  const description = row[7];
  const parsedDate = parseDate(date, 'yyyy-MM-dd', new Date());

  if (!isDateValid(parsedDate)) {
    return false;
  }
  if (!isNumeric(amount)) {
    return false;
  }
  if (!isCurrencyKnown(currency)) {
    return false;
  }
  if (!description) {
    return false;
  }

  return true;
};

const isPriorRowValid = (row: string[]): boolean => {
  const date = row[0];
  const description = row[1];
  const amount = row[2] && stringToNumber(row[2]);
  const currency = row[3];
  const parsedDate = parseDate(date, 'dd.MM.yyyy HH:mm:ss', new Date());

  if (!isDateValid(parsedDate)) {
    return false;
  }
  if (!isNumeric(amount)) {
    return false;
  }
  if (!isCurrencyKnown(currency)) {
    return false;
  }
  if (!description) {
    return false;
  }
  return true;
};

const convertIpkoRowToTransaction = (
  row: RowT,
  exchangeRate: number
): ParsedTransaction => {
  return {
    uuid: uuidv4(),
    date: row[0],
    currency: row[4],
    description: `${row[7]} ${row[8]} ${row[9]}`,
    amount: Number(row[3]),
    amountInUsd: Number((Number(row[3]) / exchangeRate).toFixed(2)),
    bank: Banks.ipko,
    originalCsvRow: JSON.stringify(row),
  };
};

const convertPriorRowToTransaction = (
  row: RowT,
  exchangeRate: number
): ParsedTransaction => {
  const date = format(
    parseDate(row[0], 'dd.MM.yyyy HH:mm:ss', new Date()),
    'yyyy-MM-dd'
  );
  return {
    uuid: uuidv4(),
    date,
    currency: row[3],
    description: row[1],
    amount: stringToNumber(row[2]),
    amountInUsd: Number((stringToNumber(row[2]) / exchangeRate).toFixed(2)),
    bank: Banks.prior,
    originalCsvRow: JSON.stringify(row),
  };
};

export const parseCSV = async (
  bank: string,
  exchangeRate: number,
  file: File
): Promise<ParsedTransaction[]> => {
  const text = await file.text();
  const rows = parse<RowT>(text, {}).data;

  switch (bank) {
    case 'ipko': {
      const transactions = rows.reduce<ParsedTransaction[]>((acc, row) => {
        if (isIpkoRowValid(row)) {
          const transaction = convertIpkoRowToTransaction(row, exchangeRate);
          acc.push(transaction);
        }

        return acc;
      }, []);

      return transactions;
    }
    case 'prior': {
      const transactions = rows.reduce<ParsedTransaction[]>((acc, row) => {
        if (isPriorRowValid(row)) {
          const transaction = convertPriorRowToTransaction(row, exchangeRate);
          acc.push(transaction);
        }

        return acc;
      }, []);

      return transactions;
    }
    default: {
      return [];
    }
  }
};
