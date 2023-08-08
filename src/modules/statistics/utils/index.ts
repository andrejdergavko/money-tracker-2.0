import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import subMilliseconds from 'date-fns/subMilliseconds';
import { format } from 'date-fns';

import { StatisticChartDatumT } from '~modules/statistics/components/statistic-chart/StatisticChart';
import { ITransaction } from '~modules/transactions/types';

interface IntervalTransactionGroup {
  date: string;
  transactions: ITransaction[];
}

export const filterByDateRange = (
  transactions: ITransaction[],
  startDate: string,
  endDate: string
) => {
  return transactions.filter(
    (transaction) =>
      new Date(transaction.date) <= new Date(endDate) &&
      new Date(transaction.date) >= new Date(startDate)
  );
};

export const filterByCategories = (
  transactions: ITransaction[],
  categories: string[]
) => {
  return transactions.filter(
    (transaction) =>
      transaction?.category && categories.includes(transaction.category.uuid)
  );
};

export const filterTransactions = (
  transactions: ITransaction[],
  startDate: string,
  endDate: string,
  categories?: string[]
) => {
  let filteredTransactions = [...transactions];

  filteredTransactions = filterByDateRange(transactions, startDate, endDate);

  if (categories && categories.length !== 0) {
    filteredTransactions = filterByCategories(transactions, categories);
  }

  return filteredTransactions;
};

const generateBlankIntervals = (
  startDate: string,
  endDate: string,
  interval: number
): IntervalTransactionGroup[] => {
  const difference = differenceInMilliseconds(
    new Date(endDate),
    new Date(startDate)
  );

  const numberOfIntervals = Math.floor(difference / interval);

  const blankIntervals = [];

  for (let index = 0; index <= numberOfIntervals; index++) {
    blankIntervals[index] = {
      date: format(
        subMilliseconds(new Date(endDate), index * interval),
        'yyyy-MM-dd'
      ),
      transactions: [],
    };
  }

  return blankIntervals;
};

export const groupByInterval = (
  transactions: ITransaction[],
  startDate: string,
  endDate: string,
  interval: number
): IntervalTransactionGroup[] => {
  const blankIntervals = generateBlankIntervals(startDate, endDate, interval);

  transactions.forEach((transaction) => {
    const difference = differenceInMilliseconds(
      new Date(endDate),
      new Date(transaction.date)
    );
    const intervalNumber = Math.floor(difference / interval);

    blankIntervals[intervalNumber].transactions.push(transaction);
  });

  return blankIntervals.reverse();
};

export const convertToChartData = (
  groupedTransactions: IntervalTransactionGroup[]
): StatisticChartDatumT[] => {
  const existingCategories = groupedTransactions.reduce<string[]>(
    (acc, { transactions }) => {
      transactions.forEach((transaction) => {
        transaction.category &&
          !acc.includes(transaction.category.label) &&
          acc.push(transaction.category.label);
      });

      return acc;
    },
    []
  );

  const chartData = groupedTransactions.map(({ date, transactions }) => {
    let blankChartDatum: StatisticChartDatumT = existingCategories.reduce(
      (acc, category) => ({ ...acc, [category]: 0 }),
      { date }
    );

    transactions.forEach((transaction) => {
      const { category, amountInUsd } = transaction;

      if (category) {
        blankChartDatum[category.label] =
          Number(blankChartDatum[category.label]) + amountInUsd;
      }
    });

    return blankChartDatum;
  });

  return chartData;
};
