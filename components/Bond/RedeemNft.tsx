import React, { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';

interface RedeemNftProps {
  nftId: string;
}

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const RedeemNft: React.FC<RedeemNftProps> = ({ nftId }) => {
  const { isConnected } = useAccount();
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleRedeemNFTClick = () => {
    if (!nftId) {
      alert('Please provide a valid NFT ID.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: bondTreasuryABI,
        functionName: 'redeemNFT',
        args: [BigInt(nftId)],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Redeem Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleRedeemNFTClick}
        disabled={txnStatus === 'Transaction submitted...' || !isConnected}
      >
        Redeem NFT #{nftId}
      </button>

      {/* Status and Transaction Hash */}
      <div className="w-full max-w-md">
        {txnStatus && (
          <div className="text-gray-600 text-sm mt-2">{txnStatus}</div>
        )}
        {transactionHash && (
          <div className="text-sm mt-2">
            Transaction Hash:{' '}
            <a
              href={`https://sepolia.basescan.org/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {transactionHash}
            </a>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            Error: {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemNft;
