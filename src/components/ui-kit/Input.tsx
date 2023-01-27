import { ComponentProps } from 'react';
import InputBase from '@mui/material/InputBase';

export function Input(props: ComponentProps<typeof InputBase>) {
  return (
    <InputBase
      classes={{
        input: 'text-sm p-3 font-sans rounded relative bg-slate-100 shadow',
      }}
      {...props}
    />
  );
}
