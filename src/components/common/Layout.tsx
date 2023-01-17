import type { FC } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: JSX.Element;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-screen">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
