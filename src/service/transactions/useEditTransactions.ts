import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';
import { EditTransactionsArgsT } from '~api/transactions';

const useEditTransactions = (
  config?: SWRMutationConfiguration<
    any,
    any,
    EditTransactionsArgsT,
    '/api/transactions'
  >
) => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/transactions',
    async (url: string, { arg }: { arg: EditTransactionsArgsT }) => {
      const res = await fetch(url, {
        method: 'PUT',
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
    editTransactions: trigger,
    data,
    isEditing: isMutating,
    error,
  };
};

export default useEditTransactions;
