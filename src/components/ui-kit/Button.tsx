import { ComponentProps } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export function Button(props: ComponentProps<typeof LoadingButton>) {
  return <LoadingButton {...props} />;
}
