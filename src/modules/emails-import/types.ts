import { Banks } from '../../constants';

export interface ParsedEmail {
  subject?: string;
  from?: string;
  text?: string;
}

export interface ParsedTransaction {
  bank: Banks;
  date: string;
  amount: number;
  currency: string;
  description: string;
  originalCsvRow: string;
}

