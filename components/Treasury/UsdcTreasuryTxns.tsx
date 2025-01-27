import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import UsdcTransactionsTable from './UsdcTransactionsTable';
import UsdcFeesTxnTable from './UsdcFeesTxnTable';

export default function UsdcTreasuryTxns() {
  const { isConnected } = useAccount();
  const [loadTransactions, setLoadTransactions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'investor' | 'fees'>('investor');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClick = () => {
    setLoadTransactions(true);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Radio Buttons */}
      <div className="flex items-center mb-6 space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="transactionType"
            value="investor"
            checked={selectedOption === 'investor'}
            onChange={() => setSelectedOption('investor')}
            className="w-5 h-5 text-blue-500 bg-gray-200 border-gray-300 rounded-full focus:ring-blue-500"
          />
          <span className="text-lg font-medium">Investor Transactions</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="transactionType"
            value="fees"
            checked={selectedOption === 'fees'}
            onChange={() => setSelectedOption('fees')}
            className="w-5 h-5 text-blue-500 bg-gray-200 border-gray-300 rounded-full focus:ring-blue-500"
          />
          <span className="text-lg font-medium">Fees Transactions</span>
        </label>
      </div>

      {/* Button to load transactions */}
      <button
        onClick={handleClick}
        disabled={!isConnected}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        Load USDC Transactions
      </button>

      {/* Transactions Table */}
      {loadTransactions &&
        (selectedOption === 'investor' ? (
          <UsdcTransactionsTable setErrorMessage={setErrorMessage} />
        ) : (
          <UsdcFeesTxnTable setErrorMessage={setErrorMessage} />
        ))}

      {/* Centralized Error Box */}
      {errorMessage && (
        <div className="w-full max-w-md p-4 bg-red-100 text-red-700 border border-red-500 rounded mt-4">
          <p>
            <strong>Error Details:</strong>
          </p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

