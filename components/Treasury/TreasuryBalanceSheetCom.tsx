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
              className="flex items-center space-x-4 text-3xl md:text-4xl font-normal leading-tight"

        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
      >
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
         Treasury Balance Sheet
        </span>
      </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
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
      </main>
    </div>
  );
};

export default TreasuryBalanceSheetCom;

