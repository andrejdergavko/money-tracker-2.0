import { ComponentProps, FC } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = ComponentProps<typeof LoadingButton>;

export const Button: FC<Props> = (props) => {
  return <LoadingButton {...props} />;
};
