import { type FC, useState } from 'react';

import SetCategoryModal from '~modules/categories/components/SetCategoryModal';
import TransactionsTable from '~modules/transactions/components/TransactionsTable';

import useDeleteTransactions from '../hooks/useDeleteTransactions';
import { ITransaction } from '../types';

const OverviewTable: FC<{ data: ITransaction[] }> = ({ data = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUuids, setSelectedUuids] = useState<string[]>([]);

  const { deleteTransactions } = useDeleteTransactions();

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
