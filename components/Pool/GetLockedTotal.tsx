import React from 'react';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json';
import vaultNFTAddress from '@/lib/vaultNFTAddress.json';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency'; // Import currency factor

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const GetLockedTotal: React.FC = () => {
  // Fetch the total locked value directly
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'getTotalLockedValue',
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

export default GetLockedTotal;
