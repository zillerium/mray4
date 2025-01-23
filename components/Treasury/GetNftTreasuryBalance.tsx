import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency'; // Import currency factor

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const GetNftTreasuryBalance: React.FC = () => {
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the bonded NFT prices
  const { data, error: contractError } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getBondedNftPrices',
  });

  useEffect(() => {
    if (data) {
      try {
        // Summing up the nftPrice values from the returned data
        const bondedValues = (data as { nftId: number; nftPrice: BigInt }[]).map(
          (item) => Number(item.nftPrice)
        );
        const total = bondedValues.reduce((sum, price) => sum + price, 0);
        setTotalValue(total / CURRENCY_FACTOR); // Scale down the value
        setError(null);
      } catch (e) {
        console.error('Error processing bonded NFT prices:', e);
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

export default GetNftTreasuryBalance;

