import { type FC, useState, memo } from 'react';

import SetCategoryModal from '~modules/categories/components/SetCategoryModal';
import TransactionsTable from '~modules/transactions/components/TransactionsTable';

import { ITransaction } from '../types';

type Props = {
  data: ITransaction[];
  onRowsDelete: (uuids: string[]) => void;
  onSetCategory: (categoryUuid: string, transactionUuids: string[]) => void;
};

const PreviewTable: FC<Props> = ({
  data = [],
  onRowsDelete,
  onSetCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUuids, setSelectedUuids] = useState<string[]>([]);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  const handleSetCategoryClick = (uuids: string[]) => {
    setSelectedUuids(uuids);
    setIsModalOpen(true);
  };

  const handleSetCategory = (categoryUuid: string) => {
    onSetCategory(categoryUuid, selectedUuids);
    handleModalClose();
  };

  return (
    <>
      <TransactionsTable
        data={data}
        onRowsDelete={onRowsDelete}
        onSetCategoryClick={handleSetCategoryClick}
      />
      {isModalOpen && (
        <SetCategoryModal
          onClose={handleModalClose}
          transactionUuids={selectedUuids}
          onSetCategory={handleSetCategory}
          isLoading={false}
        />
      )}
    </>
  );
};

export default memo(PreviewTable);
