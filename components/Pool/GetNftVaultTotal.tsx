// components/GetNftVaultTotal.tsx

import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json';
import vaultNFTAddress from '@/lib/vaultNFTAddress.json';

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const GetNftVaultTotal: React.FC = () => {
  const [totalValue, setTotalValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the total locked value from the contract
  const { data: totalLockedValueData, error: totalLockedValueError } =
    useContractRead({
      address: contractAddress,
      abi: vaultNFTABI,
      functionName: 'getTotalLockedValue',
    });

  useEffect(() => {
    if (totalLockedValueData) {
      // Convert BigNumber to ether and format as a string with 2 decimals
      setTotalValue(totalLockedValueData.toString());
      setError(null);
    } else if (totalLockedValueError) {
      setError('Error fetching total locked value');
    }
  }, [totalLockedValueData, totalLockedValueError]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-lg font-semibold">Total Locked Value</h3>
      <p>{totalValue ? `${totalValue} USD` : 'Loading...'}</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default GetNftVaultTotal;
