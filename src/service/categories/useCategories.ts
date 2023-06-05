import useSwr, { SWRConfiguration } from 'swr';
import { CategoryT } from '~app-types/entities';

const useCategories = (config?: SWRConfiguration) => {
  const { data, error, isLoading } = useSwr<CategoryT[]>(
    '/api/categories',
    async (url: string) => {
      const res = await fetch(url);

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message);
      }

      return res.json();
    },
    config
  );

  return {
    categories: data,
    isLoading,
    error,
  };
};

export default useCategories;
