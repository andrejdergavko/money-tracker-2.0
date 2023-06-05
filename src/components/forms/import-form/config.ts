import * as yup from 'yup';

import { TransactionT } from '@app-types/entities';

export interface Values {
  bank: string;
  currency: string;
  exchangeRate?: number;
  file?: File;
  transactions: TransactionT[];
}

export const initialValues = {
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
