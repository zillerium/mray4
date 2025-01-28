import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryContractABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json';

const contractAddress = bondTreasuryContractAddress.address as `0x${string}`;

interface GetCRProps {
  onCrChange: (crValue: string) => void;
}

const GetCR: React.FC<GetCRProps> = ({ onCrChange }) => {
  const [cr, setCr] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryContractABI,
    functionName: 'bondCollateralizationRatio', // Directly referencing the public variable
  });

  useEffect(() => {
    if (data) {
      const formattedCr = `${Number(data)} %`;
      setCr(formattedCr); // Format CR as percentage
      onCrChange(formattedCr); // Pass CR value to parent
    } else if (!data && error) {
      setError('Failed to fetch collateralization ratio from the contract.');
    }
  }, [data, error, onCrChange]);

  return (
    <div className="flex flex-col items-center mt-1">
      {/* Display Collateralization Ratio */}
      {isLoading ? (
        <p>Loading collateralization ratio...</p>
      ) : cr ? (
        <div className="px-6 py-3 bg-blue-100 text-blue-800 text-1xl font-extrabold rounded-md mt-1">
          Collateralization Ratio: {cr}
        </div>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : null}
    </div>
  );
};

export default GetCR;

