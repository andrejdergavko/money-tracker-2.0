import { format } from 'date-fns';

import { MONTH_IN_MILLISECONDS } from '../constants';

import useQueryParam, {
  stringType,
  booleanType,
  stringArrayType,
  numberType,
} from '@hooks/useQueryParam';

// const ALLOWED_FILTERS = [
//   'startDate',
//   'endDate',
//   'categories',
//   'summarizeBy',
//   'isTypeStack',
// ] as const;

type FiltersT = {
  startDate: string;
  endDate: string;
  categories?: string[];
  summarizeBy: number;
  isTypeStack: boolean;
};

const defaultFilters = {
  startDate: format(
    new Date(new Date().getTime() - MONTH_IN_MILLISECONDS),
    'dd-MM-yyyy'
  ),
  endDate: format(new Date(), 'dd-MM-yyyy'),
  categories: [],
  summarizeBy: MONTH_IN_MILLISECONDS,
  isTypeStack: true,
};

const useStatisticChartFilters = () => {
  const [startDate, setStartDate] = useQueryParam('startDate', stringType);
  const [endDate, setEndDate] = useQueryParam('endDate', stringType);
  const [categories, setCategories] = useQueryParam(
    'categories',
    stringArrayType
  );
  const [summarizeBy, setSummarizeBy] = useQueryParam(
    'summarizeBy',
    numberType
  );
  const [isTypeStack, setIsTypeStack] = useQueryParam(
    'isTypeStack',
    booleanType
  );

  const filters: FiltersT = {
    startDate: startDate != null ? startDate : defaultFilters.startDate,
    endDate: endDate != null ? endDate : defaultFilters.endDate,
    categories: categories != null ? categories : defaultFilters.categories,
    summarizeBy: summarizeBy != null ? summarizeBy : defaultFilters.summarizeBy,
    isTypeStack: isTypeStack != null ? isTypeStack : defaultFilters.isTypeStack,
  };

  const setters = {
    startDate: setStartDate,
    endDate: setEndDate,
    categories: setCategories,
    summarizeBy: setSummarizeBy,
    isTypeStack: setIsTypeStack,
  };

  return {
    filters,
    setters: {
      setStartDate,
      setEndDate,
      setCategories,
      setSummarizeBy,
      setIsTypeStack,
    },
  };
};

export default useStatisticChartFilters;
