import React from 'react';
import Link from 'next/link';
import { FaCog, FaCaretDown } from 'react-icons/fa';

const NavBarAdmin = () => {
  return (
    <li className="relative py-2 lg:py-0 group text-center">
      <button
        className="bg-transparent text-base text-slate-700 border-none cursor-pointer flex items-center justify-center w-full"
        type="button"
      >
        <FaCog className="text-2xl" />
        <FaCaretDown className="ml-1" /> {/* Add caret icon */}
      </button>
      {/* Dropdown Menu */}
      <ul
        role="menu"
        className="hidden group-hover:block absolute z-10 min-w-[120px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg"
      >
        <Link href="/NftAdmin">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            NFT Admin
          </li>
        </Link>
        <Link href="/TokenModel">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            Token Model
          </li>
        </Link>
        <Link href="/PriceGraph">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            Price Graph
          </li>
        </Link>
      </ul>
    </li>
  );
};

export default NavBarAdmin;

