// components/ReadInvestorPool.tsx

import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json';
import vaultNFTAddress from '@/lib/vaultNFTAddress.json';
import { FaSync } from 'react-icons/fa';

interface ReadInvestorPoolProps {
  onInvestorListUpdate: (investorList: string[]) => void;
}

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const ReadInvestorPool: React.FC<ReadInvestorPoolProps> = ({
  onInvestorListUpdate,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { error, refetch } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'getAllUsdcPayers',
  });

  const handleFetchInvestors = () => {
    refetch().then((result) => {
      if (result.data && Array.isArray(result.data)) {
        const investorList = result.data.map((address: string) =>
          address.toString(),
        );
        onInvestorListUpdate(investorList);
        setErrorMessage(null);
      } else if (error) {
        setErrorMessage('Error fetching USDC payers');
      }
    });
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={handleFetchInvestors}
      >
        <FaSync className="mr-2" /> Load Investors
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default ReadInvestorPool;
