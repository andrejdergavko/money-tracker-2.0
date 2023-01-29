import { ComponentProps, FC } from 'react';
import MuiFormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

export const FormControl: FC<
  ComponentProps<typeof MuiFormControl> & {
    helperText?: string;
    helperTextId?: string;
  }
> = ({ children, helperText, helperTextId, ...restProps }) => {
  return (
    <MuiFormControl {...restProps}>
      {children}
      {helperText && (
        <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
      )}
    </MuiFormControl>
  );
};
