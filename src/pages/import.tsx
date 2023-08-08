import type { FC } from 'react';

import ImportForm from '~modules/transactions/components/import-form';
import Layout from '~components/Layout';

const Import: FC = () => {
  return (
    <Layout>
      <ImportForm />
    </Layout>
  );
};

export default Import;
