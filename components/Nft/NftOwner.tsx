// ./components/NftOwner.tsx
import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json';
import uniContractAddress from '@/lib/uniContractAddress.json';

interface NftOwnerProps {
  nftId: string | number;
}

// Cast the address to the expected type
const contractAddress = uniContractAddress.address as `0x${string}`;

const NftOwner: React.FC<NftOwnerProps> = ({ nftId }) => {
  const [ownerAddress, setOwnerAddress] = useState<string>('');

  const { data: owner, error: ownerError } = useContractRead({
    address: contractAddress,
    abi: uniContractABI,
    functionName: 'ownerOf',
    args: [nftId],
  });

  useEffect(() => {
    if (owner) {
      setOwnerAddress(owner.toString());
    }
    if (ownerError) {
      console.error(`Error fetching owner for NFT ID ${nftId}:`, ownerError.message);
      setOwnerAddress('Error fetching owner');
    }
  }, [owner, ownerError, nftId]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">NFT Owner</h2>
      <p className="text-lg">
        NFT ID: {nftId} | Owner: {ownerAddress ? ownerAddress : 'Loading...'}
      </p>
    </div>
  );
};

export default NftOwner;

