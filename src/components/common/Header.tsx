import type { FC } from 'react';
import Image from 'next/image';
import { useRouter, NextRouter } from 'next/router';

import { PAGE_NAMES_BY_ROUTE } from '../../constants';

const Header: FC = () => {
  const router: NextRouter = useRouter();

  return (
    <nav className="w-full p-4 pb-540px bg-slate-700">
      <div className="px-10 flex justify-between items-center">
        <div className="uppercase font-bold text-slate-50 text-sm">
          {PAGE_NAMES_BY_ROUTE[router.pathname]}
        </div>
        <div className="relative w-12 h-12 rounded-full">
          <Image
            className="rounded-full"
            src="/avatar.jpeg"
            fill
            alt="Avatar"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
