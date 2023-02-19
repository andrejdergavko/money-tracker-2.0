import { ComponentProps } from 'react';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectProps } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

function CustomInput(props: ComponentProps<typeof InputBase>) {
  return (
    <InputBase
      classes={{
        root: 'text-sm px-3 min-h-[44px] font-sans rounded relative bg-slate-100 shadow',
        error: 'border border-red-400 border-solid',
      }}
      {...props}
    />
  );
}

export default function Select<T>(props: SelectProps<T>) {
  return <MuiSelect input={<CustomInput />} {...props} />;
}

export function MenuItem(props: ComponentProps<typeof MuiMenuItem>) {
  return (
    <MuiMenuItem classes={{ root: 'text-sm py-1 font-sans' }} {...props} />
  );
}
