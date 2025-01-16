import React, { useState } from 'react';
import UsdcTransactionsTable from '@/components/Treasury/UsdcTransactionsTable'; // Import TransactionsTable component
import { useAccount } from 'wagmi';

export default function UsdcTreasuryTxns() {
  const { isConnected } = useAccount();
  const [loadTransactions, setLoadTransactions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for centralized error

  const handleClick = () => {
    setLoadTransactions(true);
  };
  return (
    <div className="flex flex-col items-center">
      {/* Button to load transactions */}
      <button
        onClick={handleClick}
        disabled={!isConnected}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-4"
      >
        Your USDC Investments
      </button>

      {/* Transactions Table */}
      {loadTransactions && (
        <UsdcTransactionsTable setErrorMessage={setErrorMessage} />
      )}

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
