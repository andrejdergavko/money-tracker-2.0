import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ICategory, ITransaction } from '~app-types/entities';
import { determineCategoryPrompt } from '~lib/openai/prompts';

interface DeterminedCategoryArgs {
  transactions: ITransaction[];
  categories: ICategory[];
}

const useDetermineCategory = (
  config?: SWRMutationConfiguration<
    any,
    any,
    DeterminedCategoryArgs,
    '/api/openai/chat-gpt'
  >
) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/openai/chat-gpt',
    async (url: string, { arg }: { arg: DeterminedCategoryArgs }) => {
      const prompt = determineCategoryPrompt(arg.transactions, arg.categories);

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
    },
    config
  );

  return {
    determineCategory: trigger,
    determinedCategory: data,
    isLoading: isMutating,
    error,
  };
};

export default useDetermineCategory;
