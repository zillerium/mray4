import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; 
import usdcTreasuryContractAddress from '@/lib/usdcTreasuryAddress.json';

const GetVeMrayBalance: React.FC = () => {
  const { address: connectedWalletAddress } = useAccount();
  const [balance, setBalance] = useState<string | null>('Loading...');
  const [error, setError] = useState<string | null>(null);

  const contractAddress = usdcTreasuryContractAddress.address as `0x${string}`;

  const { data, error: balanceError } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'getVeMrayBalance', // Function in your smart contract
    args: [connectedWalletAddress],
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      // Convert BigInt to string
      setBalance(data.toString());
      setError(null); // Clear any previous error
    } else if (balanceError) {
      // Handle error and set balance to "0" as fallback
      setError('Error fetching veMray balance');
      setBalance('0');
    } else {
      // Default case for undefined or null data
      setBalance('0');
    }
  }, [data, balanceError]);

  if (error) {
    return <span className="text-red-500">{error}</span>;
  }

  // Parse balance or fallback to "0" if invalid
  const displayBalance =
    balance && !isNaN(parseFloat(balance))
      ? parseFloat(balance).toLocaleString()
      : '0';

  return <span>{displayBalance}</span>;
};

export default GetVeMrayBalance;
