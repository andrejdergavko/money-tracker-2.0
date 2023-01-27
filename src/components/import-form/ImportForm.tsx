import React from 'react';
import { ChangeEvent } from 'react';
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';

import fs from 'fs';

import { Select, MenuItem } from '@components/ui-kit/Select';
import { Input } from '@components/ui-kit/Input';
import { Button } from '@components/ui-kit/Button';
import { mockedData } from '@components/preview-table/mock-data';
import { parseCSV } from '@lib/utils/csv-parsing';

import PreviewTable from '../../components/preview-table';
import { initialValues, validationSchema } from './config';

const BANK_OPTIONS = [
  { id: '1', name: 'Prior bank' },
  { id: '2', name: 'PKO' },
];

const CURRENCY_OPTIONS = [
  { id: '1', code: 'BYR' },
  { id: '2', code: 'PLN' },
];

const ImportForm = () => {
  const { handleSubmit, values, setFieldValue, handleChange } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log(values);

  const handleParseClick = () => {
    parseCSV(values.bank, values.currency, values.exchangeRate, values.file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-14 mb-14  bg-slate-200 rounded shadow-lg">
        <div className="p-6 bg-slate-50 rounded-t">
          <h6 className="text-xl font-bold">Add new transactions</h6>
        </div>
        <div className="px-10 pb-10">
          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
            Settings
          </h6>

          <div className="mt-2 flex flex-wrap">
            <FormControl className="min-w-[200px] w-3/12 px-4 relative mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="bank-select-label"
              >
                Bank
              </label>
              <Select
                labelId="bank-select-label"
                id="bank-select"
                name="bank"
                value={values.bank}
                onChange={handleChange}
              >
                {BANK_OPTIONS.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="min-w-[150px] w-2/12 px-4 relative  mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="currency-select-label"
              >
                Currency
              </label>
              <Select
                labelId="currency-select-label"
                id="currency-select"
                name="currency"
                value={values.currency}
                onChange={handleChange}
              >
                {CURRENCY_OPTIONS.map(({ id, code }) => (
                  <MenuItem key={id} value={id}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="w-36 px-4 relative mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="exchange-rate-input"
              >
                Exchange rate
              </label>
              <Input
                id="exchange-rate-input"
                name="exchangeRate"
                value={values.exchangeRate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl className="flex-1 min-w-[240px] px-4 relative mb-3">
              <label
                className="block uppercase text-slate-600 text-xs font-bold mb-2"
                htmlFor="exchange-rate-input"
              >
                Upload CSV File
              </label>
              <input
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
            <PreviewTable data={mockedData} />
          </div>

          <div className="flex justify-end mt-10">
            <Button variant="contained" size="large">
              Add transactions
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ImportForm;
