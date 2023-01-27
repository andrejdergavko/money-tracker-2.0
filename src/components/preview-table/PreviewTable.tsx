import { FC, memo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import { Button } from '@components/ui-kit/Button';

import type { TransactionT } from '../../types/entities';

type PreviewTablePropsT = {
  data: TransactionT[];
};

const columns: MRT_ColumnDef<TransactionT>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'bank',
    header: 'Bank',
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    muiTableHeadCellProps: {
      align: 'right',
    },
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
  {
    accessorKey: 'amountInUsd',
    header: 'Amount In Usd',
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    muiTableHeadCellProps: {
      align: 'right',
    },
    muiTableBodyCellProps: {
      align: 'right',
    },
  },
];

const PreviewTable: FC<PreviewTablePropsT> = ({ data }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      enableDensityToggle={false}
      enableHiding={false}
      enableColumnActions={false}
      initialState={{
        density: 'comfortable',
        sorting: [{ id: 'date', desc: true }],
        pagination: { pageSize: 50, pageIndex: 0 },
      }}
      positionToolbarAlertBanner="bottom"
      //TopToolbarActions
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          className="normal-case m-2"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => {
            alert('Delete Selected Accounts');
          }}
          variant="contained"
          size="small"
          color="error"
        >
          <i className="fa-solid fa-trash mr-2 text-xs" />
          Delete
        </Button>
      )}
      //Row actions props
      enableRowActions
      displayColumnDefOptions={{
        'mrt-row-actions': {
          header: '',
          muiTableHeadCellProps: {
            align: 'left',
          },
        },
      }}
      renderRowActions={({ table, row }) => (
        <Button className="w-1 p-2 mx-3 min-w-fit">
          <i className="fa-solid fa-trash text-xs" />
        </Button>
      )}
      positionActionsColumn="last"
      //Pagination
      muiTablePaginationProps={{
        rowsPerPageOptions: [25, 50, 100, 200],
      }}
    />
  );
};

export default memo(PreviewTable);
