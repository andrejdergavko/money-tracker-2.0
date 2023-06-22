import type { FC } from 'react';
import ImportForm from '~components/forms/import-form';
import Layout from '~components/common/Layout';

const Import: FC = () => {
  return (
    <Layout>
      <ImportForm />
    </Layout>
  );
};

export default Import;
