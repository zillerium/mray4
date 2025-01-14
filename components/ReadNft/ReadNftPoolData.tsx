import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // ABI for NftVault contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Contract address for NftVault
import CopyText from '@/components/Util/CopyText';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

interface ReadNftBondDataProps {
  nftId: number;
}

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const ReadNftBondData: React.FC<ReadNftBondDataProps> = ({ nftId }) => {
  const [bondData, setBondData] = useState<{
    nftPrice: string;
    bondAmount: string;
    bondMaturity: string;
    bondCouponRate: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the bond data for the specified NFT ID
  const { data: bondDetailsData, error: bondDetailsError } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getBondedNftDetails', // Ensure this function fetches bond details
    args: [nftId],
  });

  // Update the bond data or error state based on the result
  useEffect(() => {
    if (bondDetailsData) {
      const {
        nftPrice,
        bondAmount,
        bondMaturity,
        bondCouponRate,
      } = bondDetailsData as {
        nftPrice: string;
        bondAmount: string;
        bondMaturity: string;
        bondCouponRate: string;
      };

      setBondData({
        nftPrice: formatNumber(Number(nftPrice) / CURRENCY_FACTOR),
        bondAmount: formatNumber(Number(bondAmount) / CURRENCY_FACTOR),
        bondMaturity: new Date(Number(bondMaturity) * 1000).toLocaleString(),
        bondCouponRate: (Number(bondCouponRate) / 100).toFixed(2) + '%',
      });
      setError(null);
    } else if (bondDetailsError) {
      setError('Error fetching bond data');
    }
  }, [bondDetailsData, bondDetailsError]);

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {bondData ? (
        <table className="table-auto w-full max-w-md bg-white border rounded-lg shadow-lg mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">NFT Price (USD)</td>
              <td className="border px-4 py-2">{bondData.nftPrice}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Bond Amount (USD)</td>
              <td className="border px-4 py-2">{bondData.bondAmount}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Bond Maturity</td>
              <td className="border px-4 py-2">{bondData.bondMaturity}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Bond Coupon Rate</td>
              <td className="border px-4 py-2">{bondData.bondCouponRate}</td>
            </tr>
          </tbody>
        </table>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <p>Loading bond data...</p>
      )}
    </div>
  );
};

export default ReadNftBondData;

