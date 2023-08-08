import * as yup from 'yup';

import { ITransaction } from '~modules/transactions/types';

export interface IValues {
  bank: string;
  currency: string;
  exchangeRate?: number;
  file?: File;
  transactions: ITransaction[];
}

export const initialValues: IValues = {
  bank: '',
  currency: '',
  exchangeRate: undefined,
  file: undefined,
  transactions: [],
};

export const validationSchema = yup.object({
  bank: yup.string().required('Please, select the bank'),
  currency: yup.string().required('Please, select the currency'),
  exchangeRate: yup.number().required('Please, enter the exchange rate'),
  file: yup.mixed().required('Please, select the csv file with transactions'),
  transactions: yup.array().min(1, 'Nothing to add, please add transactions'),
});
