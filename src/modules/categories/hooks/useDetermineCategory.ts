import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ITransaction } from '~modules/transactions/types';

import { ICategory } from '../types';
import { determineCategory } from '~modules/openai/utils/determineCategory';

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
      return await determineCategory(url, arg.transactions, arg.categories);
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

