import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import { FaSync } from 'react-icons/fa';

interface ReadBondPoolProps {
  onBondListUpdate: (bondList: number[]) => void;
}

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const ReadBondPool: React.FC<ReadBondPoolProps> = ({ onBondListUpdate }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { error, refetch } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getAllBondIds',
  });

  const handleFetchBonds = () => {
console.log("fetched bonds ========")
    refetch().then((result) => {
  console.log("Refetch result:", result); // Log the full result object
      console.log("Data returned:", result.data); // Log the data property explicitly

      if (result.data && Array.isArray(result.data)) {
        const bondList = result.data.map((id: string | number | bigint) =>
          parseInt(id.toString(), 10),
        );
        onBondListUpdate(bondList);
        setErrorMessage(null);
      } else if (error) {
        setErrorMessage('Error fetching locked Bonds');
      }
    });
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={handleFetchBonds}
      >
        <FaSync className="mr-2" /> Load Bonds
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default ReadBondPool;
