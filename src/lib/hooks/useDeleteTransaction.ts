import useSWRMutation from 'swr/mutation';

const useDeleteTransaction = () => {
  const { trigger, data, error, isMutating } = useSWRMutation(
    '/api/transaction',
    (url: string, { arg }: { arg: number }) =>
      fetch(`${url}?transactionId=${arg}`, { method: 'DELETE' })
  );

  return {
    deleteTransaction: trigger,
    data,
    isDeleting: isMutating,
    error,
  };
};

export default useDeleteTransaction;
