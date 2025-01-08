import React, { useState } from 'react';
import CustomButton from '@/components/Navbar/CustomButton';
import NavBarNFTs from '@/components/Navbar/NavBarNFTs';
import NavBarValuations from '@/components/Navbar/NavBarValuations';
import NavBarInvestors from '@/components/Navbar/NavBarInvestors';
import NavBarNftPool from '@/components/Navbar/NavBarNftPool';
import NavBarWallet from '@/components/Navbar/NavBarWallet';
import NavBarAdmin from '@/components/Navbar/NavBarAdmin';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="lg:px-16 px-6 bg-white shadow-md flex flex-wrap items-center lg:py-0 py-2">
      <div className="flex-1 flex justify-between items-center">
        <a href="/" className="flex text-lg font-semibold">
          <img
            src="logo.svg"
            width="132"
            height="75"
            className="p-2"
            alt="Mray"
          />
        </a>
      </div>

      {/* Hamburger Icon for Mobile */}
      <label
        htmlFor="menu-toggle"
        className="cursor-pointer lg:hidden block"
        onClick={toggleMenu}
      >
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>

      {/* Menu Items */}
      <div
        className={`${menuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}
        id="menu"
      >
        <nav>
          <ul className="text-xl text-center items-center gap-x-3 pt-4 lg:text-lg lg:flex lg:pt-0">
            {' '}
            {/* Reduced gap */}
            <NavBarWallet />
            <NavBarNFTs />
            <NavBarValuations />
            <NavBarNftPool />
            <NavBarInvestors />
            <NavBarAdmin /> {/* New Admin Navbar */}
            <li className="py-2 lg:py-0 lg:ml-6">
              <CustomButton />
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
