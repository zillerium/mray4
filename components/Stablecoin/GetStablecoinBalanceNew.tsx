import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json';
import mintContractAddress from '@/lib/mintContractAddress.json';
import { CURRENCY_FACTOR } from "@/components/Util/ReformatCurrency";

const stablecoinAddress = mintContractAddress.address as `0x${string}`;

interface GetStablecoinBalanceNewProps {
  walletAddress: string; // Accept wallet address as a prop
}

const GetStablecoinBalanceNew: React.FC<GetStablecoinBalanceNewProps> = ({ walletAddress }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: stablecoinBalance, error: balanceError } = useContractRead({
    address: stablecoinAddress,
    abi: mintContractABI,
    functionName: 'stablecoinBalance',
    args: [walletAddress], // Use the passed walletAddress
  });

  useEffect(() => {
    if (stablecoinBalance === null || stablecoinBalance === undefined) {
      setBalance('0');
    } else if (stablecoinBalance) {
      setBalance((Number(stablecoinBalance) / CURRENCY_FACTOR).toFixed(2));
    }
    if (balanceError) {
      setError('Error fetching stablecoin balance');
    } else {
      setError(null);
    }
  }, [stablecoinBalance, balanceError]);

  if (error) {
    return <span className="text-red-500">Error fetching balance</span>;
  }

  return <span>{balance ? parseFloat(balance).toLocaleString() : 'Loading...'}</span>;
};

export default GetStablecoinBalanceNew;

