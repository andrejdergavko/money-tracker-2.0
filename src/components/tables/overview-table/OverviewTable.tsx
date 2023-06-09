import { type FC, memo, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import { Button } from '~components/ui/Button';
import type { ICategory, ITransaction } from '~app-types/entities';

import DescriptionCell from '../cell-renderers/DescriptionCell';
import AmountCell from '../cell-renderers/AmountCell';
import AmountInUsdCell from '../cell-renderers/AmountInUsdCell';
import EditableCategoryCell from '../cell-renderers/EditableCategoryCell';

type Props = {
  data: ITransaction[];
  onRowsDelete: (Uuids: string[]) => void;
  onSetCategory: (Uuids: string[]) => void;
};

const PreviewTable: FC<Props> = ({
  data = [],
  onRowsDelete,
  onSetCategory,
}) => {
  const columns: MRT_ColumnDef<ITransaction>[] = useMemo(
    () => [
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
        accessorFn: (row) => row.category,
        header: 'Category',
        maxSize: 110,
        Cell: ({ cell, table, row }) => {
          return (
            <EditableCategoryCell
              category={cell.getValue<ICategory>()}
              onEdit={() => {
                onSetCategory([row.original?.uuid]);
              }}
            />
          );
        },
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
        Cell: ({ cell }) => (
          <AmountInUsdCell amount={cell.getValue<number>()} />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      getRowId={(originalRow) => String(originalRow.uuid)}
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
      // TopToolbarActions
      renderTopToolbarCustomActions={({ table }) => (
        <div>
          <Button
            className="normal-case m-2"
            disabled={
              !table?.getIsSomeRowsSelected() && !table?.getIsAllRowsSelected()
            }
            onClick={() => {
              const selectedUuids = table
                .getSelectedRowModel()
                .rows.map((row) => row.original?.uuid);

              onRowsDelete(selectedUuids);

              table.resetRowSelection();
            }}
            variant="contained"
            size="small"
            color="error"
          >
            <i className="fa-solid fa-trash mr-2 text-xs" />
            Delete
          </Button>
          <Button
            className="normal-case m-2"
            disabled={
              !table?.getIsSomeRowsSelected() && !table?.getIsAllRowsSelected()
            }
            onClick={() => {
              const selectedUuids = table
                .getSelectedRowModel()
                .rows.map((row) => row.original?.uuid);

              onSetCategory(selectedUuids);

              table.resetRowSelection();
            }}
            variant="contained"
            size="small"
          >
            {/* <i className="fa-solid fa-trash mr-2 text-xs" /> */}
            Set category
          </Button>
        </div>
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
            onRowsDelete([row.original?.uuid]);
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
      //Styles
      muiTablePaperProps={{
        sx: {
          boxShadow: 'none',
        },
      }}
    />
  );
};

export default memo(PreviewTable);
