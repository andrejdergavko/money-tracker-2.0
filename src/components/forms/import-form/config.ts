import * as yup from 'yup';

export const initialValues = {
  bank: '',
  currency: '',
  exchangeRate: 0,
  file: null,
  newTransactions: [
    {
      id: '1',
      date: '2020-22-22',
      currency: 'BYR',
      description:
        'Patrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol stationPatrol station',
      amount: 100,
      amountInUsd: 10,
      bank: 'Prior bank',
    },
  ],
};

export const validationSchema = yup.object({
  bank: yup.string().required('Please, select the bank'),
  currency: yup.string().required('Please, select the currency'),
  exchangeRate: yup.number().required('Please, enter the exchange rate'),
  file: yup.object(),
  newTransactions: yup.object(),
});
