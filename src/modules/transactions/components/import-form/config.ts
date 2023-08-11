import * as yup from 'yup';

import { ITransaction } from '~modules/transactions/types';

export interface IValues {
  bank: string;
  file?: File;
  transactions: ITransaction[];
}

export const initialValues: IValues = {
  bank: '',
  file: undefined,
  transactions: [],
};

export const validationSchema = yup.object({
  bank: yup.string().required('Please, select the bank'),
  file: yup.mixed().required('Please, select the csv file with transactions'),
  transactions: yup.array().min(1, 'Nothing to add, please add transactions'),
});
