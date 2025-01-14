// components/ReadNftsPool.tsx

import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import { FaSync } from 'react-icons/fa';

interface ReadNftsPoolProps {
  onNftListUpdate: (nftList: number[]) => void;
}

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const ReadNftsPool: React.FC<ReadNftsPoolProps> = ({ onNftListUpdate }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { error, refetch } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getAllBondedNfts',
  });

  const handleFetchNfts = () => {
    refetch().then((result) => {
      if (result.data && Array.isArray(result.data)) {
        const nftList = result.data.map((id: string | number | bigint) =>
          parseInt(id.toString(), 10),
        );
        onNftListUpdate(nftList);
        setErrorMessage(null);
      } else if (error) {
        setErrorMessage('Error fetching locked NFTs');
      }
    });
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={handleFetchNfts}
      >
        <FaSync className="mr-2" /> Load NFTs
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default ReadNftsPool;
