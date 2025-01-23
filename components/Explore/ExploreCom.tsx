'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import NavigationBox from './NavigationBox';

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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
          <NavigationBox href="/BondIssue" title="Issue Bond" />
          <NavigationBox href="/BondBuy" title="Buy Bond" />
          <NavigationBox href="/NftMint" title="NFT Mint" />
          <NavigationBox href="/NftUpload" title="NFT Upload" />
          <NavigationBox href="/Tokens" title="Token Balances" />
          <NavigationBox href="/UsdcTreasuryDashboard" title="Treasury Deposit" />
          <NavigationBox href="/BondedNft" title="NFT Treasury" />
          <NavigationBox href="/VestedUsdc" title="USDC Treasury" />
          <NavigationBox href="/BondTreasury" title="Bond Treasury" />
          <NavigationBox href="/TreasuryBalanceSheet" title="Treasury Balances" />
        </div>
      </main>
    </div>
  );
};

export default ExploreCom;

