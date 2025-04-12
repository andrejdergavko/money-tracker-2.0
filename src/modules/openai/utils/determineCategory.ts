import { ITransaction } from '~modules/transactions/types';
import { determineCategoryPrompt } from '../prompts';
import { ICategory } from '~modules/categories/types';

export const determineCategory = async (
  url: string,
  transactions: ITransaction[],
  categories: ICategory[]
) => {
  const prompt = determineCategoryPrompt(transactions, categories);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prompt),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message);
  }

  const assistantMessage = await res.json();
  const category = JSON.parse(assistantMessage).category;

  if (!category) {
    throw new Error(
      `Something went wrong during creating chat completion. ChatGPT answer: ${assistantMessage}`
    );
  }

  return category;
};

