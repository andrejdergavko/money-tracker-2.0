import { ChangeEvent, FC } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';

import Select, { MenuItem } from '~components/ui/Select';
import { Button } from '~components/ui/Button';
import { FormControl } from '~components/ui/FormControl';
import { BANK_OPTIONS } from 'src/constants';
import { parseCSV } from '~modules/transactions/utils.ts/csv-transactions-parsing';
import PreviewTable from '~modules/transactions/components/PreviewTable';
import useAddTransactions from '~modules/transactions/hooks/useAddTransactions';
import useTransactions from '~modules/transactions/hooks/useTransactions';
import { addCategories } from '~modules/transactions/utils.ts/substitute-categories';
import useCategories from '~modules/categories/hooks/useCategories';

import { initialValues, validationSchema, type IValues } from './config';

const ImportForm: FC = () => {
  const { addTransactions } = useAddTransactions();
  const { transactions = [] } = useTransactions();
  const { categories = [] } = useCategories();
  const { push } = useRouter();

  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    validateForm,
    errors,
  } = useFormik<IValues>({
    validateOnChange: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      //@ts-ignore
      const result = await addTransactions(values.transactions);
      result.success && push('/');
    },
  });

  const handleParseClick = async (): Promise<void> => {
    await validateForm();

    if (values.bank && values.file) {
      const parsedTransactions = await parseCSV(values.bank, values.file);

      const transactionsWithCategories = addCategories(
        parsedTransactions,
        transactions
      );

      setFieldValue('transactions', transactionsWithCategories);
    }
  };

  const handleRowsDelete = (uuidsToDelete: string[]): void => {
    const newTransactions = [...values.transactions].filter(
      //@ts-ignore
      (item) => !uuidsToDelete.includes(item.uuid)
    );

    setFieldValue('transactions', newTransactions);
  };

  const handleSetCategory = (
    categoryUuid: string,
    transactionUuids: string[]
  ): void => {
    const newTransactions = values.transactions.map((transaction) => {
      const category = categories.find(
        (category) => category.uuid === categoryUuid
      );

      //@ts-ignore
      return transactionUuids.includes(transaction.uuid)
        ? { ...transaction, category }
        : transaction;
    });

    setFieldValue('transactions', newTransactions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-10 mb-14  bg-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-slate-50 ">
          <h6 className="mx-4 text-lg font-medium">Add new transactions</h6>
        </div>
        <div className="px-10 pb-10">
          <h6 className="text-slate-400 text-sm mt-7 mb-6 font-bold uppercase">
            Parsing settings
          </h6>

          <div className="mt-2 flex flex-wrap">
            <FormControl
              className="min-w-[200px] w-2/12 px-4 relative mb-3"
              error={Boolean(errors.bank)}
              helperText={errors.bank}
              helperTextId="bank-error-text"
            >
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="bank-select-label"
              >
                Bank
              </label>
              <Select
                labelId="bank-select-label"
                aria-describedby="bank-error-text"
                id="bank-select"
                name="bank"
                value={values.bank}
                onChange={handleChange}
              >
                {BANK_OPTIONS.map(({ id, label }) => (
                  <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              className="flex-1 min-w-[240px] px-4 relative mb-3"
              error={Boolean(errors.file)}
              helperText={errors.file}
              helperTextId="file-error-text"
            >
              <label className="block uppercase text-slate-600 text-xs font-bold mb-2">
                Upload CSV File
              </label>
              <input
                aria-describedby="file-error-text"
                className="block w-full file:h-11 file:py-3 file:px-4 file:mr-3 file:border-none file:bg-slate-800
                  file:text-slate-100 file:cursor-pointer file:font-bolt text-sm shadow rounded cursor-pointer bg-gray-50 focus:outline-none"
                id="file-upload-input"
                type="file"
                name="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('file', e.target.files?.[0]);
                }}
              />
            </FormControl>

            <div className="mt-6 px-4">
              <Button
                className="h-11"
                variant="contained"
                size="large"
                onClick={handleParseClick}
              >
                Parse CSV
              </Button>
            </div>
          </div>

          <Divider className="mt-6" />

          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
            Preview
          </h6>

          <div className="rounded overflow-hidden ">
            <PreviewTable
              data={values.transactions}
              onRowsDelete={handleRowsDelete}
              onSetCategory={handleSetCategory}
            />
          </div>

          <div className="flex justify-end mt-10">
            <Button
              disabled={values.transactions.length === 0}
              variant="contained"
              size="large"
              type="submit"
            >
              Add transactions
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ImportForm;

