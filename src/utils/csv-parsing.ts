import { parse } from 'papaparse';
import parseDate from 'date-fns/parse';
import isDateValid from 'date-fns/isValid';
import { v4 as uuidv4 } from 'uuid';

import { ITransaction } from '../types/entities';
import { CURRENCIES } from '~lib/constants';

type RowT = string[];

const isNumeric = (n: string) => !!Number(n);

const isIpkoRowValid = (row: string[]): boolean => {
  const date = row[0];
  const amount = row[3];
  const currency = row[4];
  const description = row[7];
  const parsedDate = parseDate(date, 'yyyy-MM-dd', new Date());

  const isCurrencyKnown = (currency: string) =>
    CURRENCIES.some((item) => item.code === currency);

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

const convertRowToTransaction = (
  row: RowT,
  exchangeRate: number
): ITransaction => {
  return {
    uuid: uuidv4(),
    date: row[0],
    currency: row[4],
    description: `${row[7]} ${row[8]} ${row[9]}`,
    amount: Number(row[3]),
    amountInUsd: Number((Number(row[3]) / exchangeRate).toFixed(2)),
    bank: 'ipko',
    originalCsvRow: JSON.stringify(row),
  };
};

export const parseCSV = async (
  bank: string,
  exchangeRate: number,
  file: File
) => {
  const text = await file.text();
  const rows = parse<RowT>(text, {}).data;

  switch (bank) {
    case 'ipko': {
      const transactions = rows.reduce<ITransaction[]>((acc, row) => {
        if (isIpkoRowValid(row)) {
          const transaction = convertRowToTransaction(row, exchangeRate);
          acc.push(transaction);
        }

        return acc;
      }, []);

      return transactions;
    }
    case 'prior': {
      return;
    }
    default: {
      return;
    }
  }
};
