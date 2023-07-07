import { type FC, useState } from 'react';

import useDeleteTransaction from '~service/transactions/useDeleteTransactions';
import TransactionsTable from '~components/tables/transactions-table';
import SetCategoryModal from '~components/modals/SetCategoryModal';
import type { ITransaction } from '~app-types/entities';

const OverviewTable: FC<{ data: ITransaction[] }> = ({ data = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUuids, setSelectedUuids] = useState<string[]>([]);

  const { deleteTransactions } = useDeleteTransaction();

  const handledDeleteTransaction = (uuids: string[]) => {
    deleteTransactions(uuids);
  };

  const handleSetCategory = (uuids: string[]) => {
    setSelectedUuids(uuids);
    setIsModalOpen(true);
  };

  return (
    <>
      <TransactionsTable
        data={data}
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
    </>
  );
};

export default OverviewTable;
