import type { FC } from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import useCategories from '~service/categories/useCategories';
import useTransactions from '~service/transactions/useTransactions';
import useStatisticChartFilters from '~lib/hooks/useStatisticChartFilters';
import useQueryParam, { numberType } from '~lib/hooks/useQueryParam';
import FilterBlock from '~components/filter-block';
import StatisticChart from '~components/charts/statisticChart';
import Layout from '~components/common/Layout';
import OverviewTable from '~components/OverviewTable';
import {
  filterTransactions,
  groupByInterval,
  convertToChartData,
} from '~utils/statistics';

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
    selectedPeriod && groupedTransactions[selectedPeriod]
      ? groupedTransactions[selectedPeriod].transactions
      : [];

  return (
    <Layout>
      <div className="mx-14 mb-14">
        <div className="bg-white rounded shadow-lg">
          <div className="px-4 py-3 bg-slate-100 rounded-t">
            <h6 className="mx-4 text-lg font-medium">Filters</h6>
          </div>

          <div className="py-5 px-2">
            <FilterBlock />
          </div>
        </div>

        <div className="my-5 bg-white rounded shadow-lg overflow-hidden">
          <div className="px-6 py-4 rounded-t">
            <h6 className="mx-2 text-xs text-gray-400 font-normal">OVERVIEW</h6>
            <h6 className="mx-2 text-lg font-medium">Total amount</h6>
          </div>
          <div className="h-[450px]">
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

        {selectedPeriod && (
          <div className="my-5 bg-white rounded shadow-lg overflow-hidden">
            <OverviewTable data={selectedTransactions} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Statistics;
