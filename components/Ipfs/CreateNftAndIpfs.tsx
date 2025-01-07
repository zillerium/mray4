import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json';
import uniContractAddress from '@/lib/uniContractAddress.json';
import ShowTxnHash from '@/components/Util/ShowTxnHash';

interface CreateNftAndIpfsProps {
  nftWalletAddress: string;
  carModelUri: string;
}

const contractAddress = uniContractAddress.address as `0x${string}`;

const CreateNftAndIpfs: React.FC<CreateNftAndIpfsProps> = ({
  nftWalletAddress,
  carModelUri,
}) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const { data: transactionHash, writeContract, error } = useWriteContract();

  const mintNft = async () => {
    try {
      writeContract({
        address: contractAddress,
        abi: uniContractABI,
        functionName: 'createNFTandIpfs',
        args: [carModelUri, nftWalletAddress],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {carModelUri && carModelUri.trim() ? (
        // Show the enabled button when carModelUri has content
        <button
          onClick={mintNft}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-3"
        >
          Mint NFT
        </button>
      ) : (
        // Show a greyed-out disabled button otherwise
        <button
          className="px-4 py-2 bg-gray-300 text-white rounded mb-3 cursor-not-allowed"
          disabled
        >
          Mint NFT
        </button>
      )}

      {/* Replace existing transaction display code with ShowTxnHash */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default CreateNftAndIpfs;

