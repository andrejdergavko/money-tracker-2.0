import { TransactionT } from '../../../types/entities';

export const mockedData: TransactionT[] = [
  {
    id: '1',
    date: '123456789',
    currency: 'BYR',
    description: 'Patrol station',
    amount: 100,
    amountInUsd: 10,
    bank: 'Prior bank',
    category: {
      id: '1',
      label: 'Food',
      color: '#567',
    },
  },
];
