import useSWRMutation from 'swr/mutation';

export type addTransactionArgs = {
  date: string;
  currency: string;
  description?: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  categoryId?: number;
};

const useAddTransaction = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/transaction',
    (url: string, { arg }: { arg: addTransactionArgs }) =>
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
