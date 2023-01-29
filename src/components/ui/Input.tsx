import { ComponentProps } from 'react';
import InputBase from '@mui/material/InputBase';

export function Input(props: ComponentProps<typeof InputBase>) {
  return (
    <InputBase
      classes={{
        root: 'text-sm px-3 h-11 font-sans rounded relative bg-slate-100 shadow',
        error: 'border border-red-400 border-solid',
      }}
      {...props}
    />
  );
}
