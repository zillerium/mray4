'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ManageBondTreasury from '@/components/Treasury/ManageBondTreasury';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import GetBondTreasuryDetails from '@/components/Treasury/GetBondTreasuryDetails';

const BondTreasuryCom: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <ManageBondTreasury />
          <GetBondTreasuryDetails />
        </div>
      </main>
    </div>
  );
};

export default BondTreasuryCom;
