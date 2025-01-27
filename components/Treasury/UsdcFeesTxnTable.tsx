import React, { useState, useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json';
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json';
import TimestampToDate from '@/components/Util/TimestampToDate';

interface UsdcTransaction {
  usdcDepositAmount: bigint;
  usdcVestingPeriod: bigint;
}

interface UsdcFeesTxnTableProps {
  setErrorMessage: (message: string | null) => void;
}

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const UsdcFeesTxnTable: React.FC<UsdcFeesTxnTableProps> = ({ setErrorMessage }) => {
  const { address, isConnected } = useAccount();
  const [usdcFeesTxnsData, setUsdcFeesTxnsData] = useState<UsdcTransaction[] | null>(null);

  const { data: feesUsdcWalletTxnsData, error: feesUsdcWalletTxnsError } =
    useContractRead({
      address: isConnected && address ? contractAddress : undefined,
      abi: usdcTreasuryABI,
      functionName: 'getFeesUsdcWalletTxnDetails',
      args: isConnected && address ? [address] : [],
    });

  function isTransactionArray(data: unknown): data is UsdcTransaction[] {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.usdcDepositAmount === 'bigint' &&
          typeof item.usdcVestingPeriod === 'bigint'
      )
    );
  }

  useEffect(() => {
    if (feesUsdcWalletTxnsError) {
      setErrorMessage(feesUsdcWalletTxnsError.message);
    } else {
      setErrorMessage(null);
    }

    if (feesUsdcWalletTxnsData) {
      console.log("feesUsdcWalletTxnsData raw:", feesUsdcWalletTxnsData);

      if (isTransactionArray(feesUsdcWalletTxnsData)) {
        setUsdcFeesTxnsData(feesUsdcWalletTxnsData);
      } else {
        console.error("Invalid data format:", feesUsdcWalletTxnsData);
      }
    }
  }, [feesUsdcWalletTxnsData, feesUsdcWalletTxnsError, setErrorMessage]);

  return (
    <div>
      {usdcFeesTxnsData ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">USDC Fees</th>
              <th className="px-4 py-2 border">Deposit Date</th>
            </tr>
          </thead>
          <tbody>
            {usdcFeesTxnsData.map((txn, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">
                  {(Number(txn.usdcDepositAmount) / 10 ** 6).toFixed(2)} USDC
                </td>
                <td className="px-4 py-2 border">
                  <TimestampToDate timestamp={txn.usdcVestingPeriod} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading USDC fees transactions...</p>
      )}
    </div>
  );
};

export default UsdcFeesTxnTable;

