export const isNumeric = (value: any): boolean =>
  !isNaN(parseFloat(value)) && isFinite(value);

export const stringPriceToNumber = (string: string): number =>
  Number(string.replace(',', '.'));
