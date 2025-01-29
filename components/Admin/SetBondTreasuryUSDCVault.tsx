import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // ABI for BondTreasury contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for BondTreasury contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address for USDC Treasury

const SetBondTreasuryUSDCVault: React.FC = () => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const contractAddress = bondTreasuryAddress.address as `0x${string}`;
  const usdcVaultAddress = usdcTreasuryAddress.address;

  const { writeContract, error } = useWriteContract();

  const handleSetUsdcVault = async () => {
    if (!usdcVaultAddress) {
      alert('USDC Treasury Address is not available.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: bondTreasuryABI,
        functionName: 'setUsdcVaultContract',
        args: [usdcVaultAddress],
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
        onClick={handleSetUsdcVault}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Set USDC Vault in Bond Treasury
      </button>
      {txnStatus && <div className="text-lg">{txnStatus}</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
    </div>
  );
};

export default SetBondTreasuryUSDCVault;

