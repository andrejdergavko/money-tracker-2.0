//@ts-nocheck
import React, { FC, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import type { TransactionT, CategoryT } from '../../types/transaction-types';
import { mockedData as data } from './makeData';

const Example: FC = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<TransactionT>[]>(
    () => [
      {
        accessorKey: 'date',
        header: 'Date',
        // minSize: 100, //min size enforced during resizing
        maxSize: 100,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        maxSize: 100,
      },
      {
        accessorKey: 'category.label',
        header: 'Category',
        maxSize: 100,
      },
      {
        accessorKey: 'bank',
        header: 'Bank',
        maxSize: 100,
      },
      {
        accessorKey: 'currency',
        header: 'Currency',
        maxSize: 100,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
        maxSize: 100,
      },
      {
        accessorKey: 'amountInUsd',
        header: 'Amount In Usd',
        filterVariant: 'range',
        filterFn: 'betweenInclusive',
        maxSize: 100,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowActions
      renderRowActionMenuItems={(row, index) => []}
      enableRowSelection
      enableDensityToggle={false}
      initialState={{
        density: 'comfortable',
        // showGlobalFilter: true,
      }}
      //   positionGlobalFilter="left"
      //   muiSearchTextFieldProps={{
      //     // placeholder: `Search ${data.length} rows`,
      //     sx: { minWidth: '300px', paddingTop: '5px' },
      //   }}
      //   enableBottomToolbar={false}
      enablePagination={false}
    />
  );
};

export default Example;
