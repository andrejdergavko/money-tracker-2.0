import { format } from 'date-fns';

import {
  stringType,
  booleanType,
  stringArrayType,
  numberType,
} from '~hooks/useQuery/config';
import useQueryParams from '~hooks/useQuery/useQueryParams';

import { MillisecondsBy } from 'src/constants';

type FiltersT = {
  startDate: string;
  endDate: string;
  categories: string[];
  summarizeBy: number;
  isStackType: boolean;
};

const defaultFilters = {
  startDate: format(
    new Date(new Date().getTime() - MillisecondsBy.Month),
    'yyyy-MM-dd'
  ),
  endDate: format(new Date(), 'yyyy-MM-dd'),
  categories: [],
  summarizeBy: MillisecondsBy.Day,
  isStackType: true,
};

const useStatisticChartFilters = () => {
  const [params, setParams] = useQueryParams({
    startDate: stringType,
    endDate: stringType,
    categories: stringArrayType,
    summarizeBy: numberType,
    isStackType: booleanType,
  });

  const filters: FiltersT = {
    startDate: params.startDate ?? defaultFilters.startDate,
    endDate: params.endDate ?? defaultFilters.endDate,
    categories: params.categories ?? defaultFilters.categories,
    summarizeBy: params.summarizeBy ?? defaultFilters.summarizeBy,
    isStackType: params.isStackType ?? defaultFilters.isStackType,
  };

  return {
    filters,
    setFilters: setParams,
  };
};

export default useStatisticChartFilters;
