import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json'; // ABI for the ERC20 contract
import mintContractAddress from '@/lib/mintContractAddress.json'; // Address for the ERC20 contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for the Bond contract
import { FaExternalLinkAlt } from 'react-icons/fa'; // Import FontAwesome icon
import CopyText from '@/components/Util/CopyText';
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Standardized component for transaction status

interface ApproveERC20Props {
  amount: string; // The amount to approve
}

const mintAddress = mintContractAddress.address as `0x${string}`;
const bondAddress = bondTreasuryAddress.address as `0x${string}`;

const ApproveERC20Treasury: React.FC<ApproveERC20Props> = ({ amount }) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleApproveERC20Click = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      writeContract({
        address: mintAddress,
        abi: mintContractABI,
        functionName: 'increaseApproval',
        args: [bondAddress, BigInt(Number(amount) * 10 ** 6)], // Convert to 6 decimals
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
        onClick={handleApproveERC20Click}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Approve {amount} MRAY
      </button>
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ?? null} // Convert undefined to null
        error={error}
      />
    </div>
  );
};

export default ApproveERC20Treasury;

