import { convertPriorFileToTransactions } from '~modules/banks/prior/convertPriorFileToTransactions';
import { ParsedTransaction } from '~modules/transactions/types';

export const parseCSV = async (
  bank: string,
  file: File
): Promise<ParsedTransaction[]> => {
  switch (bank) {
    case 'prior': {
      return convertPriorFileToTransactions(file);
    }
    default: {
      return [];
    }
  }
};
