import React from 'react';
import Link from 'next/link';
import {
  CurrencyDollarIcon,
  ArrowsRightLeftIcon,
  HandThumbUpIcon,
  WalletIcon,
} from '@heroicons/react/24/solid';

const HomePageNFTDesc = () => (
  <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
    {/* Small Round Box for Instant Liquidity */}
    <div
      className="mb-2 inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold text-black"
      style={{ backgroundColor: '#bdc6f5' }}
    >
      Instant Liquidity
    </div>

    {/* Title */}
    <h2
      className="text-4xl md:text-5xl font-black leading-none tracking-tight"
      style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
    >
      Convert your NFT into ERC20 tokens
    </h2>

    {/* Description */}
    <p className="mt-4 text-base">
      Lock your NFT into a vault for instant ERC20 tokens. Easy to access, no
      strings attached. Short or long-term locking available. Redeem your NFT
      anytime.
    </p>

    {/* Feature List in a two-by-two grid with icons */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-base text-gray-800">
      <div className="flex items-center gap-2">
        <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
        <span>Immediate ERC20 tokens</span>
      </div>
      <div className="flex items-center gap-2">
        <ArrowsRightLeftIcon className="h-6 w-6 text-blue-600" />
        <span>No limits on withdrawals or deposits</span>
      </div>
      <div className="flex items-center gap-2">
        <HandThumbUpIcon className="h-6 w-6 text-blue-600" />
        <span>Owner Valuations agreed by Investors</span>
      </div>
      <div className="flex items-center gap-2">
        <WalletIcon className="h-6 w-6 text-blue-600" />
        <span>Direct to your wallet</span>
      </div>
    </div>

    {/* Get Started Button */}
    <Link href="/ManageNftPrice">
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200">
        Get started
      </button>
    </Link>
  </div>
);

export default HomePageNFTDesc;
