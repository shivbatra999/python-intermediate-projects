import React from 'react';
import {
  MagnifyingGlassIcon,
  CalendarIcon,
  UserGroupIcon,
  Bars3Icon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-5 py-3 max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center cursor-pointer">
          <span className="text-xl font-bold text-red-500" data-testid="logo">
            airbnb
          </span>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center border-2 rounded-full py-2 shadow-sm hover:shadow-md transition duration-300 ease-out">
          <input
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            type="text"
            placeholder="Start your search"
            aria-label="Search destinations"
            data-testid="search-input"
          />
          <MagnifyingGlassIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hover:bg-red-500 transition duration-300 ease-out mr-2" />
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4 justify-end text-gray-500">
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-full px-4 py-2 transition duration-300 ease-out">
              <CalendarIcon className="h-6" />
              <span className="text-sm">Check in</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-full px-4 py-2 transition duration-300 ease-out">
              <UserGroupIcon className="h-6" />
              <span className="text-sm">Guests</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer hover:shadow-md transition duration-300 ease-out">
            <Bars3Icon className="h-6" />
            <UserCircleIcon className="h-6" />
          </div>
        </div>
      </div>

      {/* Mobile search */}
      <div className="flex md:hidden mx-5 mb-3">
        <div className="flex items-center border-2 rounded-full py-2 shadow-sm hover:shadow-md transition duration-300 ease-out w-full">
          <input
            className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
            type="text"
            placeholder="Start your search"
            aria-label="Search destinations"
          />
          <MagnifyingGlassIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer hover:bg-red-500 transition duration-300 ease-out mr-2" />
        </div>
      </div>
    </header>
  );
};

export default Header;
