import React from 'react';
import Link from 'next/link';
import HomePageTokenization from './HomePageTokenization';
import HomePageLiquidity from './HomePageLiquidity';

const HomePageDesc = () => (
  <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
    {/* Opening Text */}
    <h2
      className="text-3xl md:text-4xl font-normal leading-tight"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
    >
      <span className="text-4xl md:text-5xl">Liquidity</span>{' '}
      <span className="text-4xl md:text-5xl italic">for</span>{' '}
      <span className="text-4xl md:text-5xl">your NFTs</span>
      <br />
    </h2>

    {/* Description Text */}
    <p className="mt-4 text-base">
      Your NFTs can be very valuable but illiquid. Their value is inaccessible to you.{' '}
      <span className="font-semibold">
       We unlock your NFT value with a secure no-risk protocol
      </span>
      , using bonds and a Treasury.
    </p>

    {/* Get Started Button */}
    <Link href="/NftMint">
      <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200">
        Get started
      </button>
    </Link>

    {/* New Section with Tokenization and Liquidity Components */}
    <div className="flex flex-col md:flex-row gap-4 mt-8">
      <div className="flex-1">
        <HomePageTokenization />
      </div>
      <div className="flex-1">
        <HomePageLiquidity />
      </div>
    </div>
  </div>
);

export default HomePageDesc;
