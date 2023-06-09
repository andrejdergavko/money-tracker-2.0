import useSwr, { SWRConfiguration } from 'swr';

import { ITransaction } from '~app-types/entities';

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message);
  }

  return res.json();
};

const useTransactions = (config?: SWRConfiguration) => {
  const { data, error, isLoading } = useSwr<ITransaction[]>(
    '/api/transactions',
    fetcher,
    config
  );

  return {
    transactions: data,
    isLoading,
    error,
  };
};

export default useTransactions;
