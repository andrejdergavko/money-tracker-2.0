import { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';

import Select, { MenuItem } from '@components/ui/Select';
import Input from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { FormControl } from '@components/ui/FormControl';
import { BANK_OPTIONS, CURRENCIES } from '@lib/constants';
import useAddTransactions from '@service/transactions/useAddTransactions';

import { parseCSV } from 'src/utils/csv-parsing';
import PreviewTable from '../../tables/preview-table';
import { initialValues, validationSchema, type Values } from './config';

const ImportForm = () => {
  const { addTransactions } = useAddTransactions();
  const { push } = useRouter();

  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    validateForm,
    errors,
  } = useFormik<Values>({
    validateOnChange: false,
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = await addTransactions(values.transactions);
      result.success && push('/');
    },
  });

  const handleParseClick = async () => {
    await validateForm();

    if (values.bank && values.exchangeRate && values.file) {
      const transactions = await parseCSV(
        values.bank,
        values.exchangeRate,
        values.file
      );

      setFieldValue('transactions', transactions);
    }
  };

  const handleRowsDelete = (uuidsToDelete: string[]) => {
    const newTransactions = [...values.transactions].filter(
      (item) => !uuidsToDelete.includes(item.uuid)
    );

    setFieldValue('transactions', newTransactions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-14 mb-14  bg-slate-200 rounded shadow-lg">
        <div className="p-6 bg-slate-50 rounded-t">
          <h6 className="text-xl font-bold">Add new transactions</h6>
        </div>
        <div className="px-10 pb-10">
          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
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
              className="min-w-[150px] w-2/12 px-4 relative  mb-3"
              error={Boolean(errors.currency)}
              helperText={errors.currency}
              helperTextId="currency-error-text"
            >
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="currency-select-label"
              >
                Currency
              </label>
              <Select
                labelId="currency-select-label"
                aria-describedby="currency-error-text"
                id="currency-select"
                name="currency"
                value={values.currency}
                onChange={handleChange}
              >
                {CURRENCIES.map(({ id, code }) => (
                  <MenuItem key={id} value={id}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              className="w-36 px-4 relative mb-3"
              error={Boolean(errors.exchangeRate)}
              helperText={errors.exchangeRate}
              helperTextId="exchange-rate-error-text"
            >
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="exchange-rate-input"
              >
                Exchange rate
              </label>
              <Input
                aria-describedby="exchange-rate-error-text"
                id="exchange-rate-input"
                name="exchangeRate"
                value={values.exchangeRate}
                onChange={handleChange}
                type="number"
              />
            </FormControl>

            <FormControl
              className="flex-1 min-w-[240px] px-4 relative mb-3"
              error={Boolean(errors.file)}
              helperText={errors.file}
              helperTextId="file-error-text"
            >
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="exchange-rate-input"
              >
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
