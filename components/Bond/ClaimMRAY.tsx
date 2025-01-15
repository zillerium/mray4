//components/Treasury/ClaimMRAY.tsx
import React from 'react';
import { useAccount } from 'wagmi';
import MintMRAY from '@/components/Bond/MintMRAY';

interface GetNftApprovalProps {
  nftId: number;
  nftOwner: string;
}

const ClaimMRAY: React.FC<GetNftApprovalProps> = ({ nftId, nftOwner }) => {
  const { address: connectedWalletAddress } = useAccount();

  return (
    <div>
      {nftOwner === connectedWalletAddress ? (
        <MintMRAY nftId={nftId} />
      ) : (
        <div className="flex flex-col items-start space-y-2 mt-4">
          <p className="text-sm text-red-500">Only the NFT Owner can Add</p>
          <button
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
            disabled
          >
            Submit to Pool
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimMRAY;
