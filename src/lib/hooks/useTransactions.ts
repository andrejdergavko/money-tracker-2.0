import swr from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useTransactions = () => {
  const { data, error, isLoading } = swr('/api/transactions', fetcher);

  return {
    transactions: data,
    isLoading,
    error,
  };
};

export default useTransactions;
