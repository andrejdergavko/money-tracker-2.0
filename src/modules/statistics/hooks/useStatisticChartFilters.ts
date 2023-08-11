import { format } from 'date-fns';

import useQueryParam, {
  stringType,
  booleanType,
  stringArrayType,
  numberType,
} from 'src/hooks/useQueryParam';

import { MillisecondsBy } from '../../../constants';

type FiltersT = {
  startDate: string;
  endDate: string;
  categories?: string[];
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
  const [isStackType, setIsStackType] = useQueryParam(
    'isStackType',
    booleanType
  );

  const filters: FiltersT = {
    startDate: startDate != null ? startDate : defaultFilters.startDate,
    endDate: endDate != null ? endDate : defaultFilters.endDate,
    categories: categories != null ? categories : defaultFilters.categories,
    summarizeBy: summarizeBy != null ? summarizeBy : defaultFilters.summarizeBy,
    isStackType: isStackType != null ? isStackType : defaultFilters.isStackType,
  };

  return {
    filters,
    setters: {
      setStartDate,
      setEndDate,
      setCategories,
      setSummarizeBy,
      setIsStackType,
    },
  };
};

export default useStatisticChartFilters;
