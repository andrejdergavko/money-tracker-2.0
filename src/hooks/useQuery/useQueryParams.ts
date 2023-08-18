import { useRouter } from 'next/router';

import { ConfigT } from './config';

type ValueT<T> = T extends Object & {
  encode(value: infer V): string | number | string[] | number[] | undefined;
}
  ? V
  : undefined;
type ParamsT<T> = {
  [paramName in keyof T]: ValueT<T[paramName]>;
};

function useQueryParams<T extends Record<string, ConfigT<any>>>(
  paramConfigMap: T
): [ParamsT<T>, (value: Partial<ParamsT<T>>) => void] {
  const { push, query } = useRouter();

  const paramsAliases = Object.keys(paramConfigMap);
  const params = paramsAliases.reduce<ParamsT<T>>((acc, paramName) => {
    const config = paramConfigMap[paramName];
    const encodedValue = config.decode(query[paramName]);
    return { ...acc, [paramName]: encodedValue };
  }, {} as ParamsT<T>);

  const setParams = (newParams: Partial<T>) => {
    const encodedParams = Object.entries(newParams).reduce<Partial<ParamsT<T>>>(
      (acc, [paramName, paramValue]) => {
        const config = paramConfigMap[paramName];

        return {
          ...acc,
          [paramName]: config.encode(paramValue),
        };
      },
      {}
    );

    push({ query: { ...query, ...encodedParams } }, undefined, {
      shallow: true,
    });
  };

  return [params, setParams];
}

export default useQueryParams;
