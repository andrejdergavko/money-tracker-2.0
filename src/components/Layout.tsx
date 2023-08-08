import type { FC, PropsWithChildren } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = PropsWithChildren<{}>;

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen max-h-screen overflow-y-scroll bg-slate-100">
        <Header />
        <main className="mt-[-370px]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
