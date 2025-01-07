import React, { useState } from 'react';
import { useContractWrite } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json'; // ABI for the Vault contract
import vaultNFTAddress from '@/lib/vaultNFTAddress.json'; // Vault contract address

interface RedeemUsdcTokensProps {
  txnId: number; // Transaction ID for redeeming
}

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const RedeemUsdcTokens: React.FC<RedeemUsdcTokensProps> = ({ txnId }) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useContractWrite();

  const handleRedeemClick = () => {
    setTxnStatus(null);

    try {
      writeContract({
        address: contractAddress,
        abi: vaultNFTABI,
        functionName: 'redeemUSDC',
        args: [BigInt(txnId)], // Passing txnId as BigInt
      });

      setTxnStatus('Transaction submitted...');
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('Transaction failed:', e.message);
        setTxnStatus('Transaction failed: ' + e.message);
      } else {
        console.error('An unknown error occurred.');
        setTxnStatus('Transaction failed: An unknown error occurred.');
      }
    }

  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
        onClick={handleRedeemClick}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        {txnStatus === 'Transaction submitted...' ? 'Processing...' : 'Redeem'}
      </button>
      {txnStatus && <p className="text-lg">{txnStatus}</p>}
      {transactionHash && <p className="text-lg">Transaction Hash: {transactionHash}</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default RedeemUsdcTokens;

