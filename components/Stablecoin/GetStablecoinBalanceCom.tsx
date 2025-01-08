'use client';

import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import ShowStablecoinBal from '@/components/Stablecoin/ShowStablecoinBal';
import ShowStableCoinImageBalance from '@/components/Stablecoin/ShowStableCoinImageBalance';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

export default function GetStablecoinBalanceCom() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <ShowStablecoinBal />
          <ShowStableCoinImageBalance />
        </div>
      </main>
    </div>
  );
}
