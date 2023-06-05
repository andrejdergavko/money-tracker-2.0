import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { type DeleteTransactionsArgsT } from '@api/transactions';

const useDeleteTransactions = (
  config?: SWRMutationConfiguration<
    any,
    any,
    DeleteTransactionsArgsT,
    '/api/transactions'
  >
) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/transactions',
    async (url: string, { arg }: { arg: DeleteTransactionsArgsT }) => {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message);
      }

      return res.json();
    },
    config
  );

  return {
    deleteTransactions: trigger,
    data,
    isDeleting: isMutating,
    error,
  };
};

export default useDeleteTransactions;
