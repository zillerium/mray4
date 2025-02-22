import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import usdcABI from '@/lib/usdcABI.json'; // ABI for the USDC token
import usdcContractAddress from '@/lib/usdcAddress.json'; // Address of the USDC token contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address for the vault contract

const GetUsdcTotalTreasuryBalance: React.FC = () => {
  const [usdcBalance, setUsdcBalance] = useState<string>('Loading...');

  const contractAddress = usdcTreasuryAddress.address as `0x${string}`;
  const { data } = useContractRead({
    address: usdcContractAddress.address as `0x${string}`,
    abi: usdcABI,
    functionName: 'balanceOf',
    args: [contractAddress], // Get treasury balance
  });
console.log("data 2 === ", data)
  useEffect(() => {
    // Handle all cases, including 0n, null, and undefined
    const balance = data ? Number(data) / 10 ** 6 : 0; // Convert or default to 0
    const formattedBalance = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance); // Format with commas and two decimals
    setUsdcBalance(formattedBalance);
  }, [data]);

  return <span>{`${usdcBalance} USDC`}</span>;
};

export default GetUsdcTotalTreasuryBalance;

