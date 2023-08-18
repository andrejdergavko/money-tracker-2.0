export interface ConfigT<T> {
  encode: (value: T) => string | number | string[] | number[] | undefined;
  decode: (value: string | string[] | undefined) => T | undefined;
}

export const stringType: ConfigT<string> = {
  encode: (value) => value,
  decode: (value) => (typeof value === 'string' ? value : undefined),
};

export const numberType: ConfigT<number> = {
  encode: (value) => value,
  decode: (value) => (value != null ? Number(value) : undefined),
};

export const booleanType: ConfigT<boolean> = {
  encode: (value) => (value ? 1 : 0),
  decode: (value) => (value != null ? Boolean(Number(value)) : undefined),
};

export const stringArrayType: ConfigT<string[]> = {
  encode: (value) => value,
  decode: (value) =>
    Array.isArray(value) ? value : typeof value === 'string' ? [value] : [],
};
