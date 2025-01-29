import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json'; // ABI for the Mint contract
import mintContractAddress from '@/lib/mintContractAddress.json'; // Address for the Mint contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address to whitelist

const SetERC20Whitelist: React.FC = () => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const contractAddress = mintContractAddress.address as `0x${string}`;
  const bondTreasuryAddr = bondTreasuryAddress.address;

  const { writeContract, error } = useWriteContract();

  const handleAddToWhitelist = async () => {
    if (!bondTreasuryAddr) {
      alert('Bond Treasury Address is not available.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: mintContractABI,
        functionName: 'addToWhitelist',
        args: [bondTreasuryAddr], // Pass the address to whitelist
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddToWhitelist}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Add to Whitelist
      </button>
      {txnStatus && <div className="text-lg">{txnStatus}</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
    </div>
  );
};

export default SetERC20Whitelist;

