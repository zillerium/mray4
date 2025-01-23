'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

const ExploreCom: React.FC = () => {

  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

<h1
  className="flex items-center justify-center text-4xl md:text-5xl font-normal leading-tight mb-8 text-center"
  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
>
  Explore Bonds and Liquidity
</h1>


      </main>
    </div>
  );
};

export default ExploreCom;

