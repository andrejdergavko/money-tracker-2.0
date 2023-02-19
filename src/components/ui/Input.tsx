import { ComponentProps } from 'react';
import InputBase from '@mui/material/InputBase';
// import MuiTextField from '@mui/material/TextField';

export default function TextField(props: ComponentProps<typeof InputBase>) {
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
