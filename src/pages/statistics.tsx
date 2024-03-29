import type { FC } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import useCategories from '~modules/categories/hooks/useCategories';
import useStatisticChartFilters from '~modules/statistics/hooks/useStatisticChartFilters';
import useQueryParam from '~hooks/useQuery/useQueryParam';
import { numberType } from '~hooks/useQuery/config';
import StatisticChart from '~modules/statistics/components/statistic-chart';
import Layout from '~components/Layout';
import OverviewTable from '~modules/transactions/components/OverviewTable';
import useTransactions from '~modules/transactions/hooks/useTransactions';
import {
  filterTransactions,
  groupByInterval,
  convertToChartData,
} from '~modules/statistics/utils';
import FilterBlock from '~modules/statistics/components/FilterBlock';

const Statistics: FC = () => {
  const {
    filters: { startDate, endDate, categories, summarizeBy, isStackType },
  } = useStatisticChartFilters();
  const [selectedPeriod, setSelectedPeriod] = useQueryParam(
    'selectedPeriod',
    numberType
  );
  const { transactions = [] } = useTransactions();
  const { categories: allCategories = [] } = useCategories();
  const categoryColors = allCategories.reduce<{ [label: string]: string }>(
    (acc, category) => {
      acc[category.label] = category.color;
      return acc;
    },
    {}
  );

  const filteredTransactions = filterTransactions(
    transactions,
    startDate,
    endDate,
    categories
  );

  const groupedTransactions = groupByInterval(
    filteredTransactions,
    startDate,
    endDate,
    summarizeBy
  );

  const chartData = convertToChartData(groupedTransactions);

  const handlePeriodSelect = (index: number) => setSelectedPeriod(index);

  const selectedTransactions =
    selectedPeriod != null && groupedTransactions[selectedPeriod]
      ? groupedTransactions[selectedPeriod].transactions
      : [];

  return (
    <Layout>
      <div className="mx-10 mb-14">
        <div className="bg-white rounded-xl  overflow-hidden">
          <div className="px-4 py-3 bg-slate-100">
            <h6 className="mx-4 text-lg font-medium">Overview</h6>
          </div>
          <div className="py-5 px-4">
            <FilterBlock />
          </div>
          <div className="h-[450px] mt-2">
            <ParentSize>
              {({ width, height }) => (
                <StatisticChart
                  data={chartData}
                  colors={categoryColors}
                  width={width}
                  height={height}
                  margin={{ left: 60, top: 30, right: 40, bottom: 50 }}
                  isStackType={isStackType}
                  onPeriodSelect={handlePeriodSelect}
                />
              )}
            </ParentSize>
          </div>
        </div>

        {selectedPeriod != null && (
          <div className="my-5 bg-white rounded-xl overflow-hidden">
            <OverviewTable data={selectedTransactions} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Statistics;
