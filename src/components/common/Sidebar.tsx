import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';

import { Routes } from '~lib/enums';

type MenuItem = {
  label: string;
  icon: string;
  href: Routes;
};

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Transactions',
    icon: 'fa-solid fa-table',
    href: Routes.transactions,
  },
  {
    label: 'Statistics',
    icon: 'fa-solid fa-chart-pie',
    href: Routes.statistics,
  },
  {
    label: 'Import',
    icon: 'fa-solid fa-file-import',
    href: Routes.import,
  },
];

const Sidebar: FC = () => {
  const router = useRouter();

  return (
    <aside className="w-80 px-6 py-4 shadow-xl">
      <div className="pt-3 pb-1">
        <Link href="/" className="font-bold uppercase">
          Money tracker
        </Link>
      </div>

      <Divider className="my-4 mt-6" />

      <ul className="list-none">
        {MENU_ITEMS.map((item) => (
          <li key={item.label} className="my-3">
            <Link
              href={item.href}
              className={`py-3 flex items-center uppercase font-bold text-xs hover:text-slate-500 ${
                router.pathname === item.href
                  ? 'text-sky-500 hover:text-sky-600'
                  : ''
              }`}
            >
              <i
                className={`${item.icon} mr-3 text-base ${
                  router.pathname === item.href ? 'text-sky-500' : 'opacity-40'
                }`}
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Divider className="my-4 mt-6" />
    </aside>
  );
};

export default Sidebar;
