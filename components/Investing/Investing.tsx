'use client';

import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import GetVeMrayBalanceButton from '@/components/VeMray/GetVeMrayBalanceButton';
import VeMayInvestorImage from '@/components/VeMray/VeMayInvestorImage';
import GetVeMrayWalletUsdcTxns from '@/components/Usdc/GetVeMrayWalletUsdcTxns';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

export default function Investing() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <GetVeMrayBalanceButton />
          <VeMayInvestorImage />
        </div>

        <div className="w-full mt-8">
          <GetVeMrayWalletUsdcTxns />
        </div>
      </main>
    </div>
  );
}
