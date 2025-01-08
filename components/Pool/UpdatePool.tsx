// ./components/UpdatePool.tsx

import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import vaultContractABI from '@/lib/vaultNFTABI.json'; // ABI for the NftPool contract
import vaultContractAddress from '@/lib/vaultNFTAddress.json'; // Address for the NftPool contract

interface UpdatePoolProps {
  nftId: number;
}

const contractAddress = vaultContractAddress.address as `0x${string}`;

const UpdatePool: React.FC<UpdatePoolProps> = ({ nftId }) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { writeContract, error } = useWriteContract();

  const handleAddToPoolClick = async () => {
    if (!nftId) {
      alert('Invalid NFT ID.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: vaultContractABI,
        functionName: 'lockNFTAndMintTokens',
        args: [nftId],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddToPoolClick}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Submit to Pool
      </button>
      {txnStatus && <div className="text-lg">{txnStatus}</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
    </div>
  );
};

export default UpdatePool;
