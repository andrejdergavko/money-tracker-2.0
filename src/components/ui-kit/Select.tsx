import { ComponentProps } from 'react';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

function CustomInput(props: ComponentProps<typeof InputBase>) {
  return (
    <InputBase
      classes={{
        input: 'text-sm p-3 font-sans rounded relative bg-slate-100 shadow',
      }}
      {...props}
    />
  );
}

export function Select(props: ComponentProps<typeof MuiSelect>) {
  return <MuiSelect input={<CustomInput />} {...props} />;
}

export function MenuItem(props: ComponentProps<typeof MuiMenuItem>) {
  return (
    <MuiMenuItem classes={{ root: 'text-sm py-1 font-sans' }} {...props} />
  );
}
