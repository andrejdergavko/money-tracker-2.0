import { type FC, memo, useMemo } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~components/ui/Button';
import { ICategory } from '~modules/categories/types';

import DescriptionCell from '../../../components/cell-renderers/DescriptionCell';
import AmountCell from '../../../components/cell-renderers/AmountCell';
import AmountInUsdCell from '../../../components/cell-renderers/AmountInUsdCell';
import EditableCategoryCell from '../../../components/cell-renderers/EditableCategoryCell';
import { ITransaction } from '../types';

type Props = {
  data: ITransaction[];
  onRowsDelete: (uuids: string[]) => void;
  onSetCategoryClick: (Uuids: string[]) => void;
};

const TransactionsTable: FC<Props> = ({
  data = [],
  onRowsDelete,
  onSetCategoryClick,
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
                onSetCategoryClick([row.original?.uuid]);
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
        density: 'compact',
        sorting: [{ id: 'date', desc: true }],
        pagination: { pageSize: 100, pageIndex: 0 },
      }}
      muiTableBodyRowProps={({ row }) => ({
        onClick: row.getToggleSelectedHandler(),
        sx: { cursor: 'pointer' },
      })}
      positionToolbarAlertBanner="bottom"
      // TopToolbarActions
      renderTopToolbarCustomActions={({ table }) => (
        <div>
          <Button
            className="normal-case m-2"
            disabled={
              !table?.getIsSomeRowsSelected() && !table?.getIsAllRowsSelected()
            }
            onClick={(e) => {
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
            <FontAwesomeIcon icon={faTrash} className="mr-2" size="sm" />
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

              onSetCategoryClick(selectedUuids);

              table.resetRowSelection();
            }}
            variant="contained"
            size="small"
          >
            <FontAwesomeIcon icon={faPen} size="sm" className="mr-2" />
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
          onClick={(e) => {
            e.stopPropagation();
            onRowsDelete([row.original?.uuid]);
          }}
        >
          <FontAwesomeIcon icon={faTrash} size="sm" />
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

export default memo(TransactionsTable);
