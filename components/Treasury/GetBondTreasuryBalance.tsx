import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondQueryTreasuryABI from '@/lib/bondQueryTreasuryABI.json';
import bondQueryTreasuryAddress from '@/lib/bondQueryTreasuryAddress.json';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency'; // Import currency factor

const contractAddress = bondQueryTreasuryAddress.address as `0x${string}`;

const GetBondTreasuryBalance: React.FC = () => {
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, error: contractError } = useContractRead({
    address: contractAddress,
    abi: bondQueryTreasuryABI,
    functionName: 'getAllBondInfo',
  });

  useEffect(() => {
    if (data) {
      try {
        const bondedValues = (data as { bondId: number; bondAmount: BigInt }[]).map(
          (item) => Number(item.bondAmount)
        );
        const total = bondedValues.reduce((sum, price) => sum + price, 0);
        setTotalValue(total / CURRENCY_FACTOR); // Scale down the value
        setError(null);
      } catch (e) {
        console.error('Error processing bonded Bond prices:', e);
        setError('Error calculating total value');
      }
    } else if (contractError) {
      console.error('Error fetching bonded NFT prices:', contractError);
      setError('Error fetching total value');
    }
  }, [data, contractError]);

  if (error) {
    // Return a controlled error message
    return <span className="text-red-500">{error}</span>;
  }

  if (totalValue === null) {
    // Show "Loading..." only if data is not yet available
    return <span>Loading...</span>;
  }

  const formattedValue = new Intl.NumberFormat('en-US').format(totalValue);

  return <span>{totalValue > 0 ? `${formattedValue} USD` : '0 USD'}</span>;
};

export default GetBondTreasuryBalance;

