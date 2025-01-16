import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json';
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json';
import TimestampToDate from '@/components/Util/TimestampToDate';
import RedeemUsdcTokens from '@/components/Treasury/RedeemUsdcTokens';

interface UsdcTransaction {
  lockedUsdc: bigint; // Corrected field name
  expiryTimestamp: bigint;
}

interface UsdcTransactionsTableProps {
  setErrorMessage: (message: string | null) => void;
}

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const UsdcTransactionsTable: React.FC<UsdcTransactionsTableProps> = ({
  setErrorMessage,
}) => {
  const { address, isConnected } = useAccount();
  const [usdcTxnsData, setUsdcTxnsData] = useState<UsdcTransaction[] | null>(
    null,
  );

  const { data: usdcWalletTxnsData, error: usdcWalletTxnsError } =
    useContractRead({
      address: isConnected && address ? contractAddress : undefined,
      abi: usdcTreasuryABI,
      functionName: 'getUsdcWalletTxnDetails',
      args: isConnected && address ? [address] : [],
    });

  function isTransactionArray(data: unknown): data is UsdcTransaction[] {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.lockedUsdc === 'bigint' &&
          typeof item.expiryTimestamp === 'bigint',
      )
    );
  }

  useEffect(() => {
    if (usdcWalletTxnsError) {
      setErrorMessage(usdcWalletTxnsError.message);
    } else {
      setErrorMessage(null);
    }

    if (usdcWalletTxnsData && isTransactionArray(usdcWalletTxnsData)) {
      setUsdcTxnsData(usdcWalletTxnsData);
    }
  }, [usdcWalletTxnsData, usdcWalletTxnsError, setErrorMessage]);

  return (
    <div>
      {usdcTxnsData ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Locked USDC</th>
              <th className="px-4 py-2 border">Expiry Date</th>
              <th className="px-4 py-2 border">Redeem</th>
            </tr>
          </thead>
          <tbody>
            {usdcTxnsData.map((txn, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {(Number(txn.lockedUsdc) / 10 ** 6).toFixed(2)} USDC
                </td>
                <td className="px-4 py-2 border">
                  <TimestampToDate timestamp={txn.expiryTimestamp} />
                </td>
                <td className="px-4 py-2 border">
                  <RedeemUsdcTokens txnId={index + 1} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading USDC transactions...</p>
      )}
    </div>
  );
};

export default UsdcTransactionsTable;
