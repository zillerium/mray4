import React, { useState, useEffect } from 'react';
import { useContractWrite } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // Correct ABI for the vault contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address of the vault contract
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Utility component for showing transaction hash
import { FaDollarSign } from 'react-icons/fa'; // Import icon library for USDC icon

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const UsdcTreasuryDeposit: React.FC = () => {
  const [usdcAmount, setUsdcAmount] = useState<string>('');
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useContractWrite();

  const handleMintTokensClick = () => {
    setTxnStatus('Transaction submitted...');
    setErrorMessage(null);

    try {
      const usdcAmountBigInt = BigInt(Number(usdcAmount) * 10 ** 6); // Adjust for USDC decimals
      writeContract({
        address: contractAddress,
        abi: usdcTreasuryABI,
        functionName: 'treasuryUsdcDeposit',
        args: [usdcAmountBigInt],
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error('Transaction failed:', e.message);
        setErrorMessage(e.message);
      } else {
        console.error('Transaction failed with an unknown error:', e);
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(`Minting failed: ${error.message}`);
      setTxnStatus(null);
    }
  }, [error]);

  const handleUsdcAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdcAmount(e.target.value);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Input and Button Container */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 w-full max-w-md">
        {/* Input Box */}
        <input
          type="number"
          placeholder="USDC Amount"
          value={usdcAmount}
          onChange={handleUsdcAmountChange}
          className="border border-gray-300 rounded-lg p-2 w-2/3 text-lg"
          style={{ marginRight: '0.5rem' }}
        />

        {/* Button */}
        <button
          className={`flex items-center justify-center bg-blue-500 text-white font-bold px-6 py-2 rounded-full ${
            txnStatus === 'Transaction submitted...'
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          onClick={handleMintTokensClick}
          disabled={txnStatus === 'Transaction submitted...'}
          style={{ width: '30%' }}
        >
          {txnStatus === 'Transaction submitted...' ? (
            'Processing...'
          ) : (
            <>
              Deposit
            </>
          )}
        </button>
      </div>

      {/* Transaction Status and Error Messages */}
      {(txnStatus || errorMessage || transactionHash) && (
        <div className="w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg p-4 mt-4">
          {txnStatus && (
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong> {txnStatus}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 mb-2">
              <strong>Error:</strong> {errorMessage}
            </p>
          )}
          {transactionHash && (
            <p className="text-green-500 mb-2">
              <strong>Transaction Hash:</strong>{' '}
              <ShowTxnHash
                txnStatus={txnStatus}
                transactionHash={transactionHash}
                error={error}
              />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UsdcTreasuryDeposit;
