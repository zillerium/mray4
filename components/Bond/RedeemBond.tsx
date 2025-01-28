import React, { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import ShowTxnHash from '@/components/Util/ShowTxnHash';

interface RedeemBondProps {
  bondId: string;
}

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const RedeemBond: React.FC<RedeemBondProps> = ({ bondId }) => {
  const { isConnected } = useAccount();
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleRedeemBondClick = () => {
    if (!bondId) {
      alert('Please provide a valid Bond ID.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: bondTreasuryABI,
        functionName: 'redeemBond',
        args: [BigInt(bondId)],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Redeem Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleRedeemBondClick}
        disabled={txnStatus === 'Transaction submitted...' || !isConnected}
      >
        Redeem Bond #{bondId}
      </button>

      {/* Status and Transaction Hash */}
      <div className="w-full max-w-md">
        <ShowTxnHash
          txnStatus={txnStatus}
          transactionHash={transactionHash ? transactionHash.toString() : null}
          error={error}
        />
      </div>
    </div>
  );
};

export default RedeemBond;

