import React from 'react';

import useTransactions from '@hooks/useTransactions';
import useDeleteTransaction from '@lib/hooks/useDeleteTransactions';
import OverviewTable from '@components/tables/overview-table';
import SetCategoryModal from '@components/modals/SetCategoryModal';

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedUuids, setSelectedUuids] = React.useState<string[]>([]);

  const { transactions } = useTransactions();
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
