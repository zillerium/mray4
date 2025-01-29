import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json'; // ABI for the ERC20 contract
import mintContractAddress from '@/lib/mintContractAddress.json'; // Address for the ERC20 contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for the Bond contract
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Standardized component for transaction status

const mintAddress = mintContractAddress.address as `0x${string}`;
const bondAddress = bondTreasuryAddress.address as `0x${string}`;

const UnApproveERC20Treasury: React.FC = () => {
  const [amount, setAmount] = useState<string>(''); // State to capture the input amount
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleUnApproveERC20Click = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      await writeContract({
        address: mintAddress,
        abi: mintContractABI,
        functionName: 'decreaseApproval',
        args: [bondAddress, BigInt(Number(amount))], // Convert amount to 6 decimals
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Input box for amount */}
      <input
        type="text"
        placeholder="Enter amount "
        className="border border-gray-300 px-4 py-2 rounded w-full max-w-md"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Button to trigger the unapprove function */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
        onClick={handleUnApproveERC20Click}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Unapprove {amount || '...'} MRAY
      </button>

      {/* Transaction status */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ?? null} // Convert undefined to null
        error={error}
      />
    </div>
  );
};

export default UnApproveERC20Treasury;

