import type { FC } from 'react';

const Header: FC = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-2.5">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Money tracker
          </span>
          <div className="flex items-center">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
