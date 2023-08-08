import { type FC, useState } from 'react';

import SetCategoryModal from '~modules/categories/components/SetCategoryModal';
import TransactionsTable from '~modules/transactions/components/TransactionsTable';

import useEditTransactions from '../hooks/useEditTransactions';
import useDeleteTransactions from '../hooks/useDeleteTransactions';
import { ITransaction } from '../types';

const OverviewTable: FC<{ data: ITransaction[] }> = ({ data = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUuids, setSelectedUuids] = useState<string[]>([]);
  const { deleteTransactions } = useDeleteTransactions();
  const { editTransactions, isEditing } = useEditTransactions({
    onSuccess: handleModalClose,
  });

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const handledDeleteTransaction = (uuids: string[]) => {
    deleteTransactions(uuids);
  };

  const handleSetCategoryClick = (uuids: string[]) => {
    setSelectedUuids(uuids);
    setIsModalOpen(true);
  };

  const handleSetCategory = (categoryUuid: string) => {
    editTransactions({
      uuids: selectedUuids,
      fields: { categoryUuid },
    });
  };

  return (
    <>
      <TransactionsTable
        data={data}
        onRowsDelete={handledDeleteTransaction}
        onSetCategoryClick={handleSetCategoryClick}
      />
      {isModalOpen && (
        <SetCategoryModal
          onClose={handleModalClose}
          transactionUuids={selectedUuids}
          onSetCategory={handleSetCategory}
          isLoading={isEditing}
        />
      )}
    </>
  );
};

export default OverviewTable;
