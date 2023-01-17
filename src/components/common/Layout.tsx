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
      <div className="w-screen max-h-screen overflow-y-scroll">
        <Header />
        <main className="mt-(-500px)">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
