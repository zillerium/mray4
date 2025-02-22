import React from 'react';
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa'; // Import caret icon

const NavBarTreasury = () => {
  return (
    <li className="relative py-2 lg:py-0 group">
      <button
        className="bg-transparent py-2 px-1 text-base text-slate-700 border-none cursor-pointer transition-all focus:outline-none"
        type="button"
      >
        <span className="flex items-center">
          Treasury
          <FaCaretDown className="ml-1" />
        </span>
      </button>
      <ul
        role="menu"
        className="hidden group-hover:block absolute z-10 min-w-[120px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg"
      >
        <Link href="/UsdcTreasuryDashboard">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            Deposit
          </li>
        </Link>
<Link href="/BondedNft">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            NFTs
          </li>
        </Link>
        <Link href="/VestedUsdc">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            USDC 
          </li>
        </Link>
        <Link href="/BondTreasury">
          <li
            role="menuitem"
            className="cursor-pointer p-2 text-base hover:bg-[#f3f4f6] transition-colors"
          >
            Bond
          </li>
        </Link>
      </ul>
    </li>
  );
};

export default NavBarTreasury;
