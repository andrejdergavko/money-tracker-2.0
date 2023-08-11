import type { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

import { PAGE_NAMES_BY_ROUTE } from 'src/constants';
import { Button } from '~components/ui/Button';

const Header: FC = () => {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="w-full pb-[370px] bg-slate-700">
      <div className=" py-5 px-10 flex justify-between items-center">
        <div className="uppercase font-bold text-slate-50 text-sm">
          {PAGE_NAMES_BY_ROUTE[router.pathname]}
        </div>

        <div className="flex">
          <Button
            className="mr-2 px-4 text-white normal-case"
            variant="text"
            size="medium"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
          <Image
            width={40}
            height={40}
            className="rounded-full relative"
            src={user?.image || '/no-avatar.jpg'}
            alt="Avatar"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
