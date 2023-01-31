import React, { type FC } from 'react';
import { SWRConfig } from 'swr';
import { useSnackbar } from 'notistack';

interface Props {
  children: JSX.Element;
}

const SwrConfig: FC<Props> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          if (error.status !== 403 && error.status !== 404) {
            enqueueSnackbar(error?.message, {
              variant: 'error',
              anchorOrigin: { horizontal: 'right', vertical: 'top' },
            });
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrConfig;
