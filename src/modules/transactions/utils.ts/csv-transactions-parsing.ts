import { convertPriorFileToTransactions } from '~modules/banks/prior/convertPriorFileToTransactions';
import { TransactionWithoutUserId } from '~modules/transactions/types';

export const parseCSV = async (
  bank: string,
  file: File
): Promise<TransactionWithoutUserId[]> => {
  switch (bank) {
    case 'prior': {
      return convertPriorFileToTransactions(file);
    }
    default: {
      return [];
    }
  }
};

