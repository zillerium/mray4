// FundingTable.tsx
import React from 'react';

interface FundingTableProps {
  fundingTxns: {
    walletAddress: string;
    amount: number;
  }[];
}

const FundingTable: React.FC<FundingTableProps> = ({ fundingTxns }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wallet Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              USD Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">

{fundingTxns.map((txn, index) => (
  <tr key={index}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {txn.walletAddress}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(txn.amount)}
    </td>
  </tr>
))}

        </tbody>
      </table>
    </div>
  );
};

export default FundingTable;

