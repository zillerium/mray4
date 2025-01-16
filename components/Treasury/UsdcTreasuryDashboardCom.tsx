'use client';

import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
import UsdcTreasuryManager from '@/components/Treasury/UsdcTreasuryManager';
import DisplayUsdcTreasuryImage from '@/components/Treasury/DisplayUsdcTreasuryImage';
import UsdcTreasuryTxns from '@/components/Treasury/UsdcTreasuryTxns';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

export default function UsdcTreasuryDashboardCom() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <UsdcTreasuryManager />
          <DisplayUsdcTreasuryImage />
        </div>

        <div className="w-full mt-8">
          <UsdcTreasuryTxns />
        </div>
      </main>
    </div>
  );
}
