import { parse } from 'papaparse';
export const parseCSV = async (
  bank: string,
  currency: string,
  exchangeRate: number,
  file
) => {
  const text = await file.text();
  // console.log(text);
  console.log(parse(text, {}));
};
// C:\\fakepath\\history_csv_20230126_183036.csv
