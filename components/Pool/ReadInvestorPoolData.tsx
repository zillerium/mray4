// components/Pool/ReadInvestorPoolData.tsx

import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json'; // ABI for Vault contract
import vaultNFTAddress from '@/lib/vaultNFTAddress.json'; // Contract address for Vault

interface ReadInvestorPoolDataProps {
  walletAddress: string;
}

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const ReadInvestorPoolData: React.FC<ReadInvestorPoolDataProps> = ({
  walletAddress,
}) => {
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the USDC balance for the selected wallet address
  const { data: balanceData, error: balanceError } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'usdcBalance',
    args: [walletAddress],
  });

  useEffect(() => {
    if (balanceData) {
      const balance = balanceData.toString(); // Convert BigNumber to string
      setUsdcBalance((Number(balance) / 1e6).toFixed(2)); // Convert to USDC format (assuming 6 decimals)
      setError(null);
    } else if (balanceError) {
      setError('Error fetching USDC balance');
    }
  }, [balanceData, balanceError]);

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {usdcBalance ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Wallet: {walletAddress}</p>
          <p className="text-xl font-bold">USDC Balance: ${usdcBalance}</p>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <p>Loading USDC balance...</p>
      )}
    </div>
  );
};

export default ReadInvestorPoolData;
