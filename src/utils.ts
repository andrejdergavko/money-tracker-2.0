export const isNumeric = (value: any): boolean =>
  !isNaN(parseFloat(value)) && isFinite(value);

export const stringToNumber = (string: string): number =>
  Number(string.replace(',', '.'));
