import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json'; // ABI for the vault contract
import vaultNFTAddress from '@/lib/vaultNFTAddress.json'; // Address for the vault contract

const GetUsdcStablecoinLockedBalance: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  const [lockedBalance, setLockedBalance] = useState<string | null>('Loading...');
  const [error, setError] = useState<string | null>(null);

  const contractAddress = vaultNFTAddress.address as `0x${string}`;

  const { data, error: usdcBalanceError } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'usdcBalance', // Contract function to fetch balance
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
    lockedBalance && !isNaN(parseFloat(lockedBalance)) ? parseFloat(lockedBalance).toLocaleString() : '0';

  return <span>{displayBalance}</span>;
};

export default GetUsdcStablecoinLockedBalance;

