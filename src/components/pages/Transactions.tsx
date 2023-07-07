import useTransactions from '~service/transactions/useTransactions';
import Layout from '~components/common/Layout';
import OverviewTable from '~components/OverviewTable';

export default function Transactions() {
  const { transactions = [] } = useTransactions();

  return (
    <Layout>
      <div className="mx-14 mb-14 rounded overflow-hidden">
        <div className="px-8 py-6 bg-slate-200">
          <h6 className="text-xl font-bold">Transactions table</h6>
        </div>
        <OverviewTable data={transactions} />
      </div>
    </Layout>
  );
}
