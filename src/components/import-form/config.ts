import * as yup from 'yup';

export const initialValues = {
  bank: '',
  currency: '',
  exchangeRate: '',
  file: null,
  newTransactions: [],
};

export const validationSchema = yup.object({
  bank: yup.string().required('Please, select the bank'),
  currency: yup.string().required('Please, select the currency'),
  exchangeRate: yup.string().required('Please, enter the exchange rate'),
  file: yup.object(),
  newTransactions: yup.object(),
});
