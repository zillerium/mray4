import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // ABI for Bond Treasury contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Contract address for Bond Treasury

interface GetBondStatusProps {
  nftId: number;
  onBondStatusFetched: (isActive: boolean) => void; // Callback for bond status
}

const GetBondStatus: React.FC<GetBondStatusProps> = ({ nftId, onBondStatusFetched }) => {
  const [statusText, setStatusText] = useState<string>('Loading...');
  const [backgroundColor, setBackgroundColor] = useState<string>('#F5DF8C'); // Default background
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Contract read to fetch bond status
  const { data: bondStatusData, error: bondStatusError } = useContractRead({
    address: bondTreasuryAddress.address as `0x${string}`,
    abi: bondTreasuryABI,
    functionName: 'getBondStatus',
    args: [nftId],
  });

  useEffect(() => {
    if (bondStatusData) {
      const [contractBuyerLiability, nftOwnerLiability] = bondStatusData as [boolean, boolean, number];

      // Define mappings for bond statuses
      const bondStatusMap: { [key: string]: { text: string; color: string; active: boolean } } = {
        'true,true': { text: 'NFT Bonded', color: '#F5C2C2', active: true },
        'true,false': { text: 'Funded Bond', color: '#F5C2C2', active: true },
        'false,true': { text: 'NFT Locked', color: '#F5C2C2', active: true },
        'false,false': { text: 'No Bond', color: '#C2F5C2', active: false },
      };

      // Construct the key and fetch status
      const key = `${contractBuyerLiability},${nftOwnerLiability}`;
      const status = bondStatusMap[key];

      if (status) {
        setStatusText(status.text);
        setBackgroundColor(status.color);
        setIsActive(status.active);
      }

      setError(null);
    } else if (bondStatusError) {
      setError('Failed to fetch bond status');
    }
  }, [bondStatusData, bondStatusError]);

  useEffect(() => {
    // Notify parent of bond status
    onBondStatusFetched(isActive);
  }, [isActive, onBondStatusFetched]);

  return (
    <div
      className="mb-2 inline-flex items-center justify-center px-3 py-1 rounded-full text-lg font-semibold text-black"
      style={{ backgroundColor }}
    >
      {error || statusText}
    </div>
  );
};

export default GetBondStatus;

