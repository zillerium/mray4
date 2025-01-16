import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // ABI for the vault contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address for the vault contract

const GetWalletUsdcTreasuryBalance: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const [lockedBalance, setLockedBalance] = useState<string | null>(
    'Loading...',
  );
  const [error, setError] = useState<string | null>(null);

  const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

  const { data, error: usdcBalanceError } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'getUsdcTreasuryWalletBalance',
    args: [walletAddress],
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setLockedBalance((Number(data) / 10 ** 6).toFixed(2)); // Convert to readable USDC format
      setError(null); // Clear any errors
    } else if (usdcBalanceError) {
      setError('Error fetching locked USDC balance');
      setLockedBalance('0'); // Fallback to 0
    } else {
      setLockedBalance('0'); // Default fallback
    }
  }, [data, usdcBalanceError]);

  if (error) {
    return <span className="text-red-500">{error}</span>;
  }

  const displayBalance =
    lockedBalance && !isNaN(parseFloat(lockedBalance))
      ? parseFloat(lockedBalance).toLocaleString()
      : '0';

  return <span>{displayBalance}</span>;
};

export default GetWalletUsdcTreasuryBalance;
