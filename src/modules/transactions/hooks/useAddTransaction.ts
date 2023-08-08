import useSWRMutation from 'swr/mutation';

import { AddTransactionArgsT } from '~api/transactions';

const useAddTransaction = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/transaction',
    (url: string, { arg }: { arg: AddTransactionArgsT }) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      })
  );

  return {
    addTransaction: trigger,
    data,
    isAdding: isMutating,
    error,
  };
};

export default useAddTransaction;
