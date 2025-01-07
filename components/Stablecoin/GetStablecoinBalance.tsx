import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json';
import mintContractAddress from '@/lib/mintContractAddress.json';

const stablecoinAddress = mintContractAddress.address as `0x${string}`;

const GetStablecoinBalance: React.FC = () => {
  const { address: connectedWalletAddress } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch stablecoin balance for the connected wallet address
  const { data: stablecoinBalance, error: balanceError } = useContractRead({
    address: stablecoinAddress,
    abi: mintContractABI,
    functionName: 'balanceOf',
    args: [connectedWalletAddress],
  });

  useEffect(() => {
    if (stablecoinBalance) {
      setBalance(stablecoinBalance.toString());
    } else if (balanceError) {
      setError('Error fetching stablecoin balance');
    }
  }, [stablecoinBalance, balanceError]);

  if (error) {
    return <span className="text-red-500">Error fetching balance</span>;
  }

  return <span>{balance ? parseFloat(balance).toLocaleString() : 'Loading...'}</span>;
};

export default GetStablecoinBalance;

