import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // ABI for the NFT contract
import uniContractAddress from '@/lib/uniContractAddress.json'; // Address for the NFT contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for the Vault contract
import { FaExternalLinkAlt } from 'react-icons/fa'; // Import FontAwesome icon
import CopyText from '@/components/Util/CopyText';
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Standardized component for transaction status

interface ApproveBondTreasuryProps {
  tokenId: string;
}

const nftAddress = uniContractAddress.address as `0x${string}`;
const vaultAddress = bondTreasuryAddress.address as `0x${string}`;

const ApproveBondTreasury: React.FC<ApproveBondTreasuryProps> = ({ tokenId }) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleApproveVaultClick = async () => {
    if (!tokenId) {
      alert('Please enter a valid token ID.');
      return;
    }

    try {
      writeContract({
        address: nftAddress,
        abi: uniContractABI,
        functionName: 'approve',
        args: [vaultAddress, Number(tokenId)],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Token ID Display */}

      {/* Approve Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
        onClick={handleApproveVaultClick}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Approve NFT {tokenId}
      </button>
    {/* Transaction Status, Hash, and Error Messages */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ?? null} // Convert undefined to null
        error={error}
      />
    </div>
  );
};

export default ApproveBondTreasury;
