// components/ReadInvestorPool.tsx

import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json';
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json';
import { FaSync } from 'react-icons/fa';

interface ReadInvestorPoolProps {
  onInvestorListUpdate: (investorList: string[]) => void;
}

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const ReadInvestorPool: React.FC<ReadInvestorPoolProps> = ({
  onInvestorListUpdate,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { error, refetch } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'getAllUsdcInvestors',
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
