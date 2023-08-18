import { useRouter } from 'next/router';

import { ConfigT } from './config';

function useQueryParam<T>(
  paramName: string,
  config: ConfigT<T>
): [T | undefined, (value: T) => void];
function useQueryParam<T>(
  paramName: string,
  config: ConfigT<T>,
  defaultValue: T
): [T, (value: T) => void];
function useQueryParam<T>(
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

export default useQueryParam;
