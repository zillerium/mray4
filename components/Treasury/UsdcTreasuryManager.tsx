import React from 'react';
import VeMrayBalanceInvestor from '@/components/Treasury/VeMrayBalanceInvestor';
import { useAccount } from 'wagmi';
import UsdcTreasuryDeposit from '@/components/Treasury/UsdcTreasuryDeposit';
import GetBondWalletTreasuryBalance from '@/components/Treasury/GetBondWalletTreasuryBalance';
import GetUSDCWalletBalance from '@/components/Util/GetUSDCWalletBalance';
import GetUsdcFeeBalance from '@/components/Treasury/GetUsdcFeeBalance';
import GetInvestorBalance from '@/components/Treasury/GetInvestorBalance';
import UsdcTreasuryApprove from '@/components/Treasury/UsdcTreasuryApprove';
import GetUsdcWalletLockedBalance from '@/components/Treasury/GetUsdcWalletLockedBalance';
import GetUsdcTotalTreasuryBalance from '@/components/Treasury/GetUsdcTotalTreasuryBalance';
import GetUsdcAllowance from '@/components/Treasury/GetUsdcAllowance';

export default function UsdcTreasuryManager() {
  const { address: connectedWalletAddress } = useAccount(); // Get the connected wallet
  const walletAddress = connectedWalletAddress ?? ''; // Default to empty string if undefined

  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
<div className="flex justify-between items-center">
  <h2 className="text-3xl md:text-4xl font-normal leading-tight">
    USDC Treasury
  </h2>
  <h2 className="text-3xl md:text-4xl font-normal leading-tight">
    <GetUsdcTotalTreasuryBalance />
  </h2>
</div>


      <br />

      <p>
        <b>Dashboard for USDC Management</b>
      </p>
      <p className="mt-4 text-base">
        Deposit, Redeem, and Approve USDC Management for the USDC Treasury.
      </p>
      <br />

      <div className="flex flex-col items-center">
        <UsdcTreasuryDeposit />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <UsdcTreasuryApprove />
      </div>

      <br />
      <div className="flex flex-col items-center">
        <GetUsdcAllowance walletAddress={walletAddress} />
      </div>

      <br />
      {/* Locked USDC Balance Button */}
      <div className="flex flex-col items-center">
        <GetUsdcWalletLockedBalance walletAddress={walletAddress} />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <GetUsdcFeeBalance walletAddress={walletAddress} />
      </div>
      <br />
      <div className="flex flex-col items-center">
        <GetInvestorBalance walletAddress={walletAddress} />
      </div>

      <br />
      <div className="flex flex-col items-center">
        <GetBondWalletTreasuryBalance walletAddress={walletAddress} />
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
