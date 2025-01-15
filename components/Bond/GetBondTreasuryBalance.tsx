import React from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency'; // Import currency factor

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const GetBondTreasuryBalance: React.FC = () => {
  // Fetch the total locked value directly
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getBondTreasuryBalance',
  });

  if (error) {
    // Return a controlled error message
    return (
      <span className="text-red-500">Error fetching total locked value</span>
    );
  }

  if (data === undefined || data === null) {
    // Show "Loading..." only if data is not yet available
    return <span>Loading...</span>;
  }

  // Return the fetched total locked value
  const totalValue = Number(data.toString()) / CURRENCY_FACTOR; // Scale down the value
  const formattedValue = new Intl.NumberFormat('en-US').format(
    Number(totalValue),
  );

  return <span>{totalValue > 0 ? `${formattedValue} USD` : '0 USD'}</span>;
};

export default GetBondTreasuryBalance;
