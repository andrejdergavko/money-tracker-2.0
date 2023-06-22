import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

import useTransactions from '~service/transactions/useTransactions';
import useDeleteTransaction from '~service/transactions/useDeleteTransactions';
import OverviewTable from '~components/tables/overview-table';
import SetCategoryModal from '~components/modals/SetCategoryModal';

export default function Transactions() {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUuids, setSelectedUuids] = useState<string[]>([]);

  const { transactions = [] } = useTransactions();
  const { deleteTransactions } = useDeleteTransaction();

  const handledDeleteTransaction = (uuids: string[]) => {
    deleteTransactions(uuids);
  };

  const handleSetCategory = (uuids: string[]) => {
    setSelectedUuids(uuids);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-14 mb-14 rounded overflow-hidden">
      {session?.user?.email} <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
      <div className="px-8 py-6 bg-slate-200">
        <h6 className="text-xl font-bold">Transactions table</h6>
      </div>
      <OverviewTable
        data={transactions}
        onRowsDelete={handledDeleteTransaction}
        onSetCategory={handleSetCategory}
      />
      <SetCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        transactionUuids={selectedUuids}
      />
    </div>
  );
}
