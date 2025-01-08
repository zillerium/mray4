import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json';
import uniContractAddress from '@/lib/uniContractAddress.json';
import ShowTxnHash from '@/components/Util/ShowTxnHash';

interface AddIpfsNftDocProps {
  ipfsAddress: string; // IPFS address supplied to the component
  nftId: number; // Selected NFT ID passed down as a prop
}

const AddIpfsNftDoc: React.FC<AddIpfsNftDocProps> = ({
  ipfsAddress,
  nftId,
}) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();
  const contractAddress = uniContractAddress.address as `0x${string}`;
  const contractABI = uniContractABI;

  const addDocToIpfs = async () => {
    try {
      setTxnStatus('Transaction submitted...');
      writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'addIpfsAddress',
        args: [nftId, ipfsAddress], // Use nftId prop instead of input
      });
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Removed the input field for NFT ID */}
      <button
        onClick={addDocToIpfs}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-3"
      >
        Add Doc to IPFS
      </button>
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default AddIpfsNftDoc;
