import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // ABI for the contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Contract address for the contract
import CopyText from '@/components/Util/CopyText';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

interface ReadNftPoolDataProps {
  nftId: number;
}

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

// Helper function to format numbers with commas as USD
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

const ReadNftPoolData: React.FC<ReadNftPoolDataProps> = ({ nftId }) => {
  const [bondData, setBondData] = useState<{
    bondId: number;
    nftPrice: string;
    bondAmount?: string;
    bondYield?: string;
    nftOwner: string;
    nftOriginalOwner: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  // Fetch the bond and NFT details for the specified NFT ID
  const { data: bondDetailsData, error: bondDetailsError } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getBondAndNftDetails',
    args: [nftId],
  });

  // Update the bond data or error state based on the result
  useEffect(() => {
    if (bondDetailsData) {
      try {
        const {
          bondDetails: { bondId, bondAmount, bondYield },
          nftDetails: { nftPrice, nftOwner, nftOriginalOwner },
        } = bondDetailsData as {
          bondDetails: {
            bondId: BigInt;
            bondAmount: BigInt;
            bondYield: BigInt;
          };
          nftDetails: {
            nftPrice: BigInt;
            nftOwner: string;
            nftOriginalOwner: string;
          };
        };

        setBondData({
          bondId: Number(bondId),
          nftPrice: formatNumber(Number(nftPrice) / CURRENCY_FACTOR),
          bondAmount: bondAmount ? formatNumber(Number(bondAmount) / CURRENCY_FACTOR) : undefined,
          bondYield: bondYield ? formatNumber(Number(bondYield) / CURRENCY_FACTOR) : undefined,
          nftOwner,
          nftOriginalOwner,
        });
        setError(null);
      } catch (e) {
        console.error('Error parsing bond details:', e);
        setError('Error parsing bond data');
      }
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
              <td className="border px-4 py-2">Bond ID</td>
              <td className="border px-4 py-2">{bondData.bondId}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">NFT Price (USD)</td>
              <td className="border px-4 py-2">{bondData.nftPrice}</td>
            </tr>
            {bondData.bondAmount && (
              <tr>
                <td className="border px-4 py-2">Bond Amount (USD)</td>
                <td className="border px-4 py-2">{bondData.bondAmount}</td>
              </tr>
            )}
            {bondData.bondYield && (
              <tr>
                <td className="border px-4 py-2">Bond Yield (USD)</td>
                <td className="border px-4 py-2">{bondData.bondYield}</td>
              </tr>
            )}
            <tr>
              <td className="border px-4 py-2">NFT Owner</td>
              <td className="border px-4 py-2">
                <CopyText copiedText={bondData.nftOwner} />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">NFT Original Owner</td>
              <td className="border px-4 py-2">
                <CopyText copiedText={bondData.nftOriginalOwner} />
              </td>
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

export default ReadNftPoolData;

