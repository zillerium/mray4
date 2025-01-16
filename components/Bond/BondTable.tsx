import React from 'react';

interface BondTableProps {
  nftPrice: number | null;
  bondAmount: number | null;
  bondMaturity: string | null;
  bondSalePeriodEnd: string | null;
  totalBondSupply: number | null;
  remainingBondSupply: number | null;
}

const BondTable: React.FC<BondTableProps> = ({
  nftPrice,
  bondAmount,
  bondMaturity,
  bondSalePeriodEnd,
  totalBondSupply,
  remainingBondSupply,
}) => {
  if (nftPrice === 0) {
    return (
      <div className="w-full bg-green-100 text-green-700 p-4 rounded-md shadow-md text-center">
        No Bond issued
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">NFT Price (USD)</th>
            <th className="px-4 py-2 border">Bond Amount</th>
            <th className="px-4 py-2 border">Bond Maturity</th>
            <th className="px-4 py-2 border">Bond Sale Period End</th>
            <th className="px-4 py-2 border">Total Bond Supply</th>
            <th className="px-4 py-2 border">Remaining Bond Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border text-center">
              {nftPrice !== null ? `${nftPrice} USD` : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {bondAmount !== null ? `${bondAmount} USD` : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {bondMaturity !== null ? bondMaturity : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {bondSalePeriodEnd !== null ? bondSalePeriodEnd : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {totalBondSupply !== null ? totalBondSupply : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {remainingBondSupply !== null ? remainingBondSupply : 'Loading...'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BondTable;

