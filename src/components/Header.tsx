'use client';
import React from 'react';
import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// import { ROUTE_TO_PAGE_NAME_MAP, Routes } from '~lib/constants';
import { PAGE_NAMES_BY_ROUTE } from 'src/constants';

const Header: FC = () => {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data } = useSession();
  const user = data?.user;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-full pb-[370px] bg-slate-700">
      <div className=" py-6 px-10 flex justify-between items-center">
        <div className="uppercase font-bold text-slate-50 text-sm">
          {PAGE_NAMES_BY_ROUTE[pathname]}
        </div>
        <div className="flex items-center text-slate-300">
          <div className="mr-3">{user?.email}</div>

          <Tooltip title="Настройки аккаунта">
            <IconButton className="p-0 m-0" onClick={handleClick} size="small">
              <Avatar
                alt="avatar"
                className="w-10 h-10"
                src={user?.image || '/no-avatar.jpg'}
              />
            </IconButton>
          </Tooltip>

          <Menu
            id="account-settings-menu"
            classes={{
              paper:
                'mt-2 rounded-lg shadow-md border border-solid border-slate-200',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => signOut()}>Выйти</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
