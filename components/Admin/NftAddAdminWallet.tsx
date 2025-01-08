import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // Import ABI for UnifiedNFT
import uniContractAddress from '@/lib/uniContractAddress.json'; // Contract address for UnifiedNFT
import ShowTxnHash from '@/components/Util/ShowTxnHash';

const NftAddAdminWallet: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleAddClick = async () => {
    if (walletAddress.length !== 42) {
      setTxnStatus('Invalid address');
      return;
    }

    setTxnStatus('Transaction submitted...');
    try {
      writeContract({
        address: uniContractAddress.address as `0x${string}`,
        abi: uniContractABI,
        functionName: 'addAdminWallet',
        args: [walletAddress],
      });
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="border rounded px-4 py-2 w-72"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add
        </button>
      </div>
      {txnStatus && <div className="text-gray-600 mt-2">{txnStatus}</div>}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default NftAddAdminWallet;
