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
      <span className="text-4xl md:text-5xl">Give</span>{' '}
      <span className="text-4xl md:text-5xl italic">all</span>{' '}
      <span className="text-4xl md:text-5xl">your RWAs</span>
      <br />
      <span
        className="text-4xl md:text-5xl font-black leading-none tracking-tight"
        style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
      >
        a place for liquidity.
      </span>
    </h2>

    {/* Description Text */}
    <p className="mt-4 text-base">
      Whether you&apos;re a collector, investor, or just trying to make the most
      of your RWAs, we&apos;ve got a brilliantly easy way to build liquidity.{' '}
      <span className="font-semibold">
        Have industry-leading liquidity on your RWAs
      </span>
      , take advantage of today&apos;s financial instruments, invest for the
      long-term with financial engineering automation, and more.
    </p>

    {/* Get Started Button */}
    <Link href="/ManageNftPage">
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
