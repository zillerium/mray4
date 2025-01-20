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
  const formatUSDC = (value: number | null): string => {
    if (value === null) return 'Loading...';
    const formattedValue = (value / 1_000_000).toFixed(2);
    return `${formattedValue} USD`;
  };

  const formatDate = (date: string | null): string => {
    if (!date || date === '0' || date === '1970-01-01') return 'Not set';
    return date;
  };

  const formatNumberWithCommas = (value: number | null): string => {
    if (value === null) return 'Loading...';
    return new Intl.NumberFormat('en-US').format(value);
  };

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
            <th className="px-4 py-2 border">Sale End</th>
            <th className="px-4 py-2 border">Total Supply</th>
            <th className="px-4 py-2 border">Remaining Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border text-center">
              {nftPrice !== null ? `${formatNumberWithCommas(nftPrice / 1_000_000)} USD` : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {formatUSDC(bondAmount)}
            </td>
            <td className="px-4 py-2 border text-center">
              {formatDate(bondMaturity)}
            </td>
            <td className="px-4 py-2 border text-center">
              {formatDate(bondSalePeriodEnd)}
            </td>
            <td className="px-4 py-2 border text-center">
              {formatNumberWithCommas(totalBondSupply)}
            </td>
            <td className="px-4 py-2 border text-center">
              {formatNumberWithCommas(remainingBondSupply)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BondTable;

