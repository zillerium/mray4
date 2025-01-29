import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // ABI for USDC Treasury contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address for USDC Treasury contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for Bond Treasury

const SetUSDCTreasuryBond: React.FC = () => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const contractAddress = usdcTreasuryAddress.address as `0x${string}`;
  const bondTreasuryAddr = bondTreasuryAddress.address;

  const { writeContract, error } = useWriteContract();

  const handleSetBondTreasury = async () => {
    if (!bondTreasuryAddr) {
      alert('Bond Treasury Address is not available.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: usdcTreasuryABI,
        functionName: 'setBondTreasuryContractAddress',
        args: [bondTreasuryAddr],
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
        onClick={handleSetBondTreasury}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Set Bond Treasury in USDC Treasury
      </button>
      {txnStatus && <div className="text-lg">{txnStatus}</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
    </div>
  );
};

export default SetUSDCTreasuryBond;

