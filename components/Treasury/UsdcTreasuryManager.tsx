import React from 'react';
import VeMrayBalanceInvestor from '@/components/Treasury/VeMrayBalanceInvestor';
import { useAccount } from 'wagmi';
import BuyUSDCVeTokens from '@/components/Treasury/BuyUSDCVeTokens';
import GetUSDCWalletBalance from '@/components/Util/GetUSDCWalletBalance';
import USDCVaultApprove from '@/components/Util/USDCVaultApprove';
import GetUsdcWalletLockedBalance from '@/components/Treasury/GetUsdcWalletLockedBalance';
import GetUsdcAllowance from '@/components/Treasury/GetUsdcAllowance';

export default function UsdcTreasuryManager() {
  const { address: connectedWalletAddress } = useAccount(); // Get the connected wallet
  const walletAddress = connectedWalletAddress ?? ''; // Default to empty string if undefined

  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl md:text-4xl font-normal leading-tight">
        Smarter Investments for Regular Yields
      </h2>
      <br />

      {/* Description */}
      <p>
        <b>Low-risk and Secure Investments</b>
      </p>
      <p className="mt-4 text-base">
        Whether you&apos;re looking for a regular yield for your USDC, secure investments, or investing in bonds, investing
in MRAY provides all these benefits.
      </p>
      <br />

      {/* Buy veTokens Section */}
      <div className="flex flex-col items-center">
        <BuyUSDCVeTokens />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <USDCVaultApprove />
      </div>

      <div className="flex flex-col items-center">
        <GetUsdcAllowance walletAddress={walletAddress} />
      </div>

      <br />
      {/* Locked USDC Balance Button */}
      <div className="flex flex-col items-center">
        <GetUsdcWalletLockedBalance walletAddress={walletAddress} />
      </div>
      <br />
      {/* Wallet Address Input and veMRay Balance Button */}
      <div className="flex flex-col items-center">
        <VeMrayBalanceInvestor />
      </div>
      <br />

      {/* USDC Balance Component */}
      <GetUSDCWalletBalance />
      <br />
    </div>
  );
}
