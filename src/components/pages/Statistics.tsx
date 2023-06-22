import type { FC } from 'react';

import Layout from '~components/common/Layout';
import FilterBlock from '~components/filter-block';

const Statistics: FC = () => {
  return (
    <Layout>
      <div className="mx-14 p-6 bg-slate-100 rounded">
        <FilterBlock />
      </div>
    </Layout>
  );
};

export default Statistics;
