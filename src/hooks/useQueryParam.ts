import { useRouter } from 'next/router';

interface ConfigT<T> {
  encode: (value: T) => string | number | string[] | number[] | undefined;
  decode: (value: string | string[] | undefined) => T | undefined;
}

export default function useQueryParam<T>(
  paramName: string,
  config: ConfigT<T>,
  defaultValue?: T
): [T | undefined, (value: T) => void] {
  const { push, query } = useRouter();

  const setParam = (value: T) => {
    const encodedValue = config.encode(value);

    push({ query: { ...query, [paramName]: encodedValue } }, undefined, {
      shallow: true,
    });
  };

  const decodedValue = query[paramName]
    ? config.decode(query[paramName])
    : defaultValue;

  return [decodedValue, setParam];
}

export const stringType: ConfigT<string> = {
  encode: (value) => value,
  decode: (value) => (typeof value === 'string' ? value : undefined),
};

export const numberType: ConfigT<number> = {
  encode: (value) => value,
  decode: (value) => Number(value),
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
