import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // ABI for Bond Treasury contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Contract address for Bond Treasury

interface GetBondStatusProps {
  nftId: number;
  onBondStatusFetched: (isActive: boolean) => void; // Callback for bond status
}


const GetBondStatus: React.FC<GetBondStatusProps> = ({ nftId, onBondStatusFetched }) => {
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Contract read to fetch bond status
  const { data: bondStatusData, error: bondStatusError } = useContractRead({
    address: bondTreasuryAddress.address as `0x${string}`,
    abi: bondTreasuryABI,
    functionName: 'isBondActive',
    args: [nftId],
  });

  useEffect(() => {
    if (bondStatusData !== undefined) {
      setIsActive(bondStatusData as boolean); // Update active status
      setError(null);
    } else if (bondStatusError) {
      setError('Failed to fetch bond status');
    }
  }, [bondStatusData, bondStatusError]);

useEffect(() => {
  if (isActive !== undefined) {
    onBondStatusFetched(!!isActive); // Pass true/false to the parent
  }
}, [isActive, onBondStatusFetched]);

  return (
    <div
      className="mb-2 inline-flex items-center justify-center px-3 py-1 rounded-full text-lg font-semibold text-black"
      style={{ backgroundColor: isActive ? '#F5DF8C' : '#7AADF5' }} // Green if active, red if not
    >
      {error
        ? 'Error fetching bond status'
        : isActive
        ? 'Live Bond'
        : 'No Live Bond'}
    </div>
  );
};

export default GetBondStatus;

