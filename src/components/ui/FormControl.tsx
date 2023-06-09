import { ComponentProps, FC } from 'react';
import MuiFormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

type Props = ComponentProps<typeof MuiFormControl> & {
  helperText?: string;
  helperTextId?: string;
};

export const FormControl: FC<Props> = ({
  children,
  helperText,
  helperTextId,
  ...restProps
}) => {
  return (
    <MuiFormControl {...restProps}>
      {children}
      {helperText && (
        <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
      )}
    </MuiFormControl>
  );
};
