{/* Input and Button Container */}


import React, { useState } from 'react';
import { useContractWrite } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // Correct ABI for the vault contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address of the vault contract
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Utility component for showing transaction hash

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const UsdcTreasuryDeposit: React.FC = () => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const [usdcAmount, setUsdcAmount] = useState<string>('');
  const { data: transactionHash, writeContract, error } = useContractWrite();

  const depositUsdc = () => {
    try {
      const usdcAmountBigInt = BigInt(Number(usdcAmount) * 10 ** 6); // Adjust for USDC decimals

      writeContract({
        address: contractAddress,
        abi: usdcTreasuryABI,
        functionName: 'treasuryUsdcDeposit',
        args: [usdcAmountBigInt],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
<div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 w-full max-w-md">
  {/* Input Field */}
  <input
    type="number"
    placeholder="USDC Amount"
    value={usdcAmount}
    onChange={(e) => setUsdcAmount(e.target.value)}
    className="border border-gray-300 rounded-lg p-2 w-2/3 text-lg"
    style={{ marginRight: '0.5rem' }}
  />

  {/* Deposit Button */}
  <button
  className="flex items-center justify-center bg-blue-500 text-white font-bold px-6 py-2 rounded-full"

    onClick={depositUsdc}
    style={{ width: '30%' }}
  >
    Deposit
  </button>
 </div>
      {/* Show Transaction Status or Errors */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default UsdcTreasuryDeposit;

