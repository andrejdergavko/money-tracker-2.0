import { prisma } from '~modules/prisma/prisma-client';
import { determineCategoryPrompt } from '~modules/openai/prompts';
import { createChatCompletion } from '~modules/openai/api-req';
import { TransactionWithoutUuid } from '../types';

const inferCategories = async (transactions: TransactionWithoutUuid[]) => {
  const categories = await prisma.category.findMany();

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    if (!transaction.category) {
      const message = determineCategoryPrompt([transaction], categories);
      const assistantMessage = await createChatCompletion(message);

      transaction.category = categories.find(
        (category) => category.label === JSON.parse(assistantMessage).category
      );
    }
  }

  return transactions;
};

export default inferCategories;

