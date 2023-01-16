import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MENU_ITEMS = [
  {
    label: 'Transactions',
    icon: 'fa-solid fa-table',
    href: '/',
  },
  {
    label: 'Statistics',
    icon: 'fa-solid fa-chart-pie',
    href: '/',
  },
  {
    label: 'Import',
    icon: 'fa-solid fa-file-import',
    href: '/',
  },
];

const Sidebar: FC = () => {
  const router = useRouter();

  return (
    <aside className="w-80 px-6 py-4 shadow-xl">
      <div className="pt-4 pb-2">
        <Link href="/" className="font-bold uppercase">
          Money tracker
        </Link>
      </div>

      <hr className="my-4 mt-6" />

      <ul>
        {MENU_ITEMS.map((item) => (
          <li key={item.label} className="my-3">
            <Link
              href={item.href}
              className={`py-3 flex uppercase font-bold text-xs hover:text-slate-500 ${
                router.pathname.indexOf('/ss') !== -1
                  ? 'text-sky-500 hover:text-sky-600'
                  : ''
              }`}
            >
              <i
                className={`${item.icon} mr-3 text-base ${
                  router.pathname.indexOf('/ss') !== -1
                    ? 'text-sky-500'
                    : 'opacity-40'
                }`}
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="my-4 mt-6" />
    </aside>
  );
};

export default Sidebar;
