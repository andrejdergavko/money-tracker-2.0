import Layout from '~components/Layout';
import OverviewTable from '~modules/transactions/components/OverviewTable';
import useTransactions from '~modules/transactions/hooks/useTransactions';

export default function Transactions() {
  const { transactions = [] } = useTransactions();

  return (
    <Layout>
      <div className="mx-14 mb-14 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-100">
          <h6 className="mx-4 text-lg font-medium">Transactions table</h6>
        </div>
        <OverviewTable data={transactions} />
      </div>
    </Layout>
  );
}
