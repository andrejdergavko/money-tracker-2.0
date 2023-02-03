import { FC, memo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import { Button } from '@components/ui/Button';

import type { TransactionT } from '../../../types/entities';
import DescriptionCell from '../cell-renderers/DescriptionCell';
import AmountCell from '../cell-renderers/AmountCell';
import AmountInUsdCell from '../cell-renderers/AmountInUsdCell';

type PreviewTablePropsT = {
  data: TransactionT[];
  onRowsDelete: (rowIds: number[]) => void;
};

const columns: MRT_ColumnDef<TransactionT>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    maxSize: 110,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    Cell: ({ cell }) => (
      <DescriptionCell description={cell.getValue<string>()} />
    ),
  },
  {
    accessorKey: 'bank',
    header: 'Bank',
    maxSize: 110,
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
    maxSize: 110,
    Cell: ({ cell }) => (
      <AmountCell
        amount={cell.getValue<number>()}
        currency={cell?.row?.original?.currency}
      />
    ),
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
    maxSize: 110,
    Cell: ({ cell }) => <AmountInUsdCell amount={cell.getValue<number>()} />,
  },
];

const PreviewTable: FC<PreviewTablePropsT> = ({ data, onRowsDelete }) => {
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
            const idsToDelete = table
              .getSelectedRowModel()
              .rows.map((row) => row.original?.id);

            onRowsDelete(idsToDelete);

            table.resetRowSelection();
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
        <Button
          className="w-1 p-2 mx-3 min-w-fit"
          onClick={() => {
            onRowsDelete([row.original?.id]);
          }}
        >
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
