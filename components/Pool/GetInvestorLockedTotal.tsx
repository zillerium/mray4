import React from 'react';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json';
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json';

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const GetInvestorLockedTotal: React.FC = () => {
  // Fetch the total locked USDC value
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'getTreasuryBalance',
  });

  if (error) {
    // Display a controlled error message
    return (
      <span className="text-red-500">
        Error fetching USDC Contract Balance (All Vaults)
      </span>
    );
  }

  if (data === undefined || data === null) {
    // Show "Loading..." only if data is not yet available
    return <span>Loading...</span>;
  }

  // Adjust total value to account for 6 decimal places of USDC
  const totalValue = data.toString();
  const adjustedValue = Number(totalValue) / 1_000_000;
  // Format the adjusted value with up to 6 decimal places
  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(adjustedValue);

  return (
    <span>{adjustedValue !== 0 ? `${formattedValue} USDC` : '0 USDC'}</span>
  );
};

export default GetInvestorLockedTotal;
