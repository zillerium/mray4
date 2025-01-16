'use client';

import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import TokensText from '@/components/Tokens/TokensText';
import TokenBalances from '@/components/Tokens/TokenBalances';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

export default function TokensCom() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <TokensText />
          <TokenBalances />
        </div>
      </main>
    </div>
  );
}
