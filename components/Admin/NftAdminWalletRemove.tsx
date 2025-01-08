import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // Import ABI for UnifiedNFT
import uniContractAddress from '@/lib/uniContractAddress.json'; // Contract address for UnifiedNFT
import ShowTxnHash from '@/components/Util/ShowTxnHash';

interface NftAdminWalletRemoveProps {
  walletAddress: string;
}

const NftAdminWalletRemove: React.FC<NftAdminWalletRemoveProps> = ({
  walletAddress,
}) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleRemoveClick = async () => {
    if (walletAddress.length !== 42) {
      setTxnStatus('Invalid address');
      return;
    }

    setTxnStatus('Transaction submitted...');
    try {
      writeContract({
        address: uniContractAddress.address as `0x${string}`,
        abi: uniContractABI,
        functionName: 'removeAdminWallet',
        args: [walletAddress],
      });
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded">
      <h3 className="text-xl font-bold mb-2 text-red-600">
        Remove Admin Wallet
      </h3>
      <p className="text-gray-700">Selected Wallet Address:</p>
      <p className="font-mono text-gray-800 bg-gray-100 p-2 rounded">
        {walletAddress}
      </p>
      <button
        onClick={handleRemoveClick}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Remove
      </button>
      {txnStatus && <div className="text-gray-600 mt-2">{txnStatus}</div>}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default NftAdminWalletRemove;
