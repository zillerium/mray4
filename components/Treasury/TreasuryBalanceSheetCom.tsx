'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import GetNftTreasuryBalance from '@/components/Treasury/GetNftTreasuryBalance';
import GetBondTreasuryBalance from '@/components/Treasury/GetBondTreasuryBalance';
import GetMraySupplyBalance from '@/components/Tokens/GetMraySupplyBalance';
import GetUsdcTotalTreasuryBalance from '@/components/Treasury/GetUsdcTotalTreasuryBalance';
import GetInvestorLockedTotal from '@/components/Treasury/GetInvestorLockedTotal';
import GetBondTreasuryTotal from '@/components/Treasury/GetBondTreasuryTotal';
import FormattedBox from '@/components/Util/FormattedBox';

const TreasuryBalanceSheetCom: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

        <h2
          className="flex items-center justify-center text-3xl md:text-4xl font-bold leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
        >
          Treasury Balance Sheet
        </h2>

        <div className="w-full mt-8 space-y-8">
          {/* Bond Treasury Section */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Bond Treasury</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormattedBox
                label="Nft Balance"
                value={<GetNftTreasuryBalance />}
                backgroundColor="#F5DF8C" // Light Gold
              />
              <FormattedBox
                label="Bond Balance"
                value={<GetBondTreasuryBalance />}
                backgroundColor="#ADD8E6" // Light Blue
              />
              <FormattedBox
                label="MRAY Balance"
                value={<GetMraySupplyBalance />}
                backgroundColor="#B0E0E6" // Lighter Blue
              />
            </div>
          </div>

          {/* USDC Treasury Section */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">USDC Treasury</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormattedBox
                label="USDC Total Balance"
                value={<GetUsdcTotalTreasuryBalance />}
                backgroundColor="#98FB98" // Light Green
              />
              <FormattedBox
                label="USDC Free Balance"
                value={<GetInvestorLockedTotal />}
                backgroundColor="#FAF3C4" // Lighter Gold
              />
              <FormattedBox
                label="USDC Bond Balance"
                value={<GetBondTreasuryTotal />}
                backgroundColor="#D3D3D3" // Light Grey
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TreasuryBalanceSheetCom;

