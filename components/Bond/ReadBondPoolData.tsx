import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import bondContractABI from '@/lib/bondTreasuryABI.json';
import bondContractAddress from '@/lib/bondTreasuryAddress.json';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';
import CopyText from '@/components/Util/CopyText';

interface ReadBondPoolDataProps {
  bondId: number;
}

const contractAddress = bondContractAddress.address as `0x${string}`;

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

const ReadBondPoolData: React.FC<ReadBondPoolDataProps> = ({ bondId }) => {
  const [bondData, setBondData] = useState<{
    bondId: number;
    nftId: number;
    nftPrice: string;
    bondAmount?: string;
    bondMaturity?: string;
    bondCouponRate?: string;
    nftOwner: string;
    nftOriginalOwner: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { data: bondDetailsData, error: bondDetailsError } = useContractRead({
    address: contractAddress,
    abi: bondContractABI,
    functionName: 'getBondDetailsWithNft',
    args: [bondId],
  });

  useEffect(() => {
    if (bondDetailsData) {
      try {
        const {
          bondDetails: { bondAmount, bondMaturity, bondCouponRate, bondId },
          nftDetails: { nftId, nftPrice, nftOwner, nftOriginalOwner },
        } = bondDetailsData as {
          bondDetails: {
            bondId: BigInt;
            bondAmount: BigInt;
            bondMaturity: BigInt;
            bondCouponRate: BigInt;
          };
          nftDetails: {
            nftId: BigInt;
            nftPrice: BigInt;
            nftOwner: string;
            nftOriginalOwner: string;
          };
        };

        setBondData({
          bondId: Number(bondId),
          nftId: Number(nftId),
          nftPrice: formatNumber(Number(nftPrice) / CURRENCY_FACTOR),
          bondAmount: bondAmount ? formatNumber(Number(bondAmount) / CURRENCY_FACTOR) : undefined,
          bondMaturity: bondMaturity
            ? new Date(Number(bondMaturity) * 1000).toLocaleString()
            : undefined,
          bondCouponRate: bondCouponRate
            ? (Number(bondCouponRate) / 100).toFixed(2) + '%'
            : undefined,
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

  const renderRedeemStatus = (bondMaturity?: string) => {
    if (!bondMaturity) return null;

    const maturityDate = new Date(bondMaturity);
    const currentDate = new Date();
    const isRedeemable = currentDate > maturityDate;

    return (
      <div>
         <div className={`ml-2 font-bold ${isRedeemable ? 'text-green-500' : 'text-red-500'}`}>
            {isRedeemable ? 'Yes' : 'No'}
         </div>
      </div>
    );
  };

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
              <td className="border px-4 py-2">NFT ID</td>
              <td className="border px-4 py-2">{bondData.nftId}</td>
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
            {bondData.bondMaturity && (
              <tr>
                <td className="border px-4 py-2">Bond Maturity</td>
                <td className="border px-4 py-2">{bondData.bondMaturity}</td>
              </tr>
            )}
            {bondData.bondMaturity && (
              <tr>
                <td className="border px-4 py-2">Redeem Possible</td>
                <td className="border px-4 py-2">{renderRedeemStatus(bondData.bondMaturity)}</td>
              </tr>
            )}
            {bondData.bondCouponRate && (
              <tr>
                <td className="border px-4 py-2">Bond Coupon Rate</td>
                <td className="border px-4 py-2">{bondData.bondCouponRate}</td>
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

export default ReadBondPoolData;

