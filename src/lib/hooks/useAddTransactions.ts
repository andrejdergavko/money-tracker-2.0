import useSWRMutation from 'swr/mutation';
import { AddTransactionsArgsT } from '../../pages/api/transactions';

const useAddTransactions = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/transactions',
    async (url: string, { arg }: { arg: AddTransactionsArgsT }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message);
      }

      return res;
    }
  );

  return {
    addTransactions: trigger,
    data,
    isAdding: isMutating,
    error,
  };
};

export default useAddTransactions;
