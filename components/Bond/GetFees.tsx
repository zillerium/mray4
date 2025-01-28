import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryContractABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json';

const contractAddress = bondTreasuryContractAddress.address as `0x${string}`;

interface GetFeesProps {
  nftPrice: string; // Price in USDC
  bondCouponRate: string; // Coupon rate in %
}

const GetFees: React.FC<GetFeesProps> = ({ nftPrice, bondCouponRate }) => {
  const [fees, setFees] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryContractABI,
    functionName: 'getFees',
    args: [
      Math.floor(parseFloat(nftPrice) * 1e6), // Convert USDC to 6 decimals
      Math.floor(parseFloat(bondCouponRate) * 100), // Convert to basis points
    ],
  });
console.log(" data ==============", data)
console.log(" data nft price  ==============",nftPrice)
console.log(" bondCouponrate  ==============",bondCouponRate)
  useEffect(() => {
    if (data) {
      const calculatedFees = (Number(data) / 1e6).toFixed(2); // Convert fees from contract back to USDC
      setFees(calculatedFees);
    }

    if (!data && error) {
      setError('Failed to fetch fees from the contract.');
    }
  }, [data, error]);

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Get Fees Button */}
      <button
        className={`${
          nftPrice && bondCouponRate ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'
        } text-white px-4 py-2 rounded`}
//        disabled={!nftPrice || !bondCouponRate}
      >
        Get Fees
      </button>

      {/* Display Fees */}
      {isLoading ? (
        <p>Loading fees...</p>
      ) : fees ? (
        <div className="px-6 py-3 bg-green-100 text-green-800 text-3xl font-extrabold rounded-md mt-4">
          Fees: {fees} USDC
        </div>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : null}
    </div>
  );
};

export default GetFees;

