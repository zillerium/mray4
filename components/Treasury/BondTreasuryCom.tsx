'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ManageBondTreasury from '@/components/Treasury/ManageBondTreasury';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import UsdcTreasuryGraphicCom from '@/components/Treasury/UsdcTreasuryGraphicCom';

const BondTreasuryCom: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <ManageBondTreasury />
          <UsdcTreasuryGraphicCom />
        </div>
      </main>
    </div>
  );
};

export default BondTreasuryCom;
