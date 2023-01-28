import { parse } from 'papaparse';
import parseDate from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import { v4 as uuidv4 } from 'uuid';

import { TransactionT } from '../types/entities';
import { CURRENCIES, Banks } from '@lib/constants';

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

  if (!isValid(parsedDate)) {
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
): TransactionT => {
  return {
    id: uuidv4(),
    date: row[0],
    currency: row[4],
    description: `${row[7]} ${row[8]} ${row[9]}`,
    amount: Number(row[3]),
    amountInUsd: Number(row[3]) / exchangeRate,
    bank: 'ipko',
    originalCsvRow: row,
  };
};

export const parseCSV = async (
  bank: string,
  exchangeRate: number,
  file: File
) => {
  if (!file) return;

  const text = await file.text();
  const rows = parse<RowT>(text, {}).data;

  switch (bank) {
    case 'ipko': {
      const newTransactions = rows.reduce<TransactionT[]>((acc, row) => {
        if (isIpkoRowValid(row)) {
          const newTransaction = convertRowToTransaction(row, exchangeRate);
          acc.push(newTransaction);
        }

        return acc;
      }, []);

      return newTransactions;
    }
    case 'prior': {
      return;
    }
    default: {
      return;
    }
  }
};
