import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json';
import mintContractAddress from '@/lib/mintContractAddress.json';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const stablecoinAddress = mintContractAddress.address as `0x${string}`;

const GetMraySupplyBalance: React.FC = () => {
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: stablecoinBalance, error: balanceError } = useContractRead({
    address: stablecoinAddress,
    abi: mintContractABI,
    functionName: 'totalSupply',
  });

  useEffect(() => {
    if (stablecoinBalance !== null && stablecoinBalance !== undefined) {
      try {
        const formattedBalance = formatNumber(Number(stablecoinBalance) / CURRENCY_FACTOR);
        setBalance(formattedBalance);
      } catch (e) {
        console.error('Error formatting stablecoin balance:', e);
        setError('Error processing stablecoin balance');
      }
    } else if (stablecoinBalance === null || stablecoinBalance === undefined) {
      setBalance(formatNumber(0)); // Default to "0.00" for null or undefined
    }

    if (balanceError) {
      setError('Error fetching stablecoin balance');
    } else {
      setError(null);
    }
  }, [stablecoinBalance, balanceError]);

  if (error) {
    return <span className="text-red-500">{error}</span>;
  }

  return <span>{balance || 'Loading...'}</span>;
};

export default GetMraySupplyBalance;

