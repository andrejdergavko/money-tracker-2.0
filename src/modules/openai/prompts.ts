import { pick } from 'lodash';

import { ICategory } from '~modules/categories/types';
import { ITransaction } from '~modules/transactions/types';

export const determineCategoryPrompt = (
  transactions: ITransaction[],
  categories: ICategory[]
) => {
  return `I have card transactions. Here they are:
     ${transactions.map((transaction) => {
       return JSON.stringify(
         pick(transaction, ['description', 'amountInUsd']),
         null,
         2
       );
     })}
    Determine one category for all these transactions.
    There are several categories: ${categories
      .map((category) => category.label)
      .join(', ')}.
    Your response is always just JSON object which looks like this example structure: {"category": {{transaction category}}} without words.`;
};
