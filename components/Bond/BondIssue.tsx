
import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import bondTreasuryContractABI from '@/lib/bondTreasuryABI.json'; // ABI for the contract
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json'; // Contract address
import CopyText from '@/components/Util/CopyText';
import { FaExternalLinkAlt } from 'react-icons/fa';
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Utility component for showing transaction hash

interface BondIssueProps {
    tokenNumber: string;
    ownedNft: boolean;
    nftPrice: string; // New prop for NFT price
    setNftPrice: React.Dispatch<React.SetStateAction<string>>; // Callback for NFT price
    bondCouponRate: string; // New prop for bond coupon rate
    setBondCouponRate: React.Dispatch<React.SetStateAction<string>>; // Callback for bond coupon rate
    collateralizationRatio: string; // New prop for collateralization ratio
}


const contractAddress = bondTreasuryContractAddress.address as `0x${string}`;

// Function to convert date to Unix timestamp
function convertToUnixTimestamp(dateStr: string): number {
  const [year, month, day] = dateStr.split('-').map(Number);
  return Math.floor(new Date(Date.UTC(year, month - 1, day)).getTime() / 1000);
}

const BondIssue: React.FC<BondIssueProps> = ({
    tokenNumber,
    ownedNft,
    nftPrice,
    setNftPrice,
    bondCouponRate,
    setBondCouponRate,
collateralizationRatio,
}) => {
  const [endDate, setEndDate] = useState<string>('');
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const calculateBondAmount = () => {
    const crValue = parseFloat(collateralizationRatio);
    const priceValue = parseFloat(nftPrice);
    if (!isNaN(crValue) && !isNaN(priceValue)) {
      return (crValue * priceValue) / 100;
    }
    return 0;
  };


  const handleSubmit = async () => {
    if (!tokenNumber || !nftPrice || !bondCouponRate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const unixTimestamp = convertToUnixTimestamp(endDate);
      const nftPriceUsdc = Math.floor(parseFloat(nftPrice) * 1e6); // USDC has 6 decimals
      const couponRateInBasisPoints = Math.floor(parseFloat(bondCouponRate) * 100); // Convert to basis points

     console.log("--- tokenNumber --- ", tokenNumber);
     console.log("---- nftPriceusdc ----", nftPriceUsdc);
console.log("--- couponRateInBasisPoints --- ", couponRateInBasisPoints);
console.log(" --- unixTimestamp ---- ", unixTimestamp);

      writeContract({
        address: contractAddress,
        abi: bondTreasuryContractABI,
        functionName: 'startBondSale',
        args: [
          Number(tokenNumber),
          nftPriceUsdc,
          couponRateInBasisPoints,
          unixTimestamp,
        ],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Input Fields */}
      <div className="flex flex-col items-start space-y-2 w-full max-w-md">
        <label className="text-gray-700">NFT Price (USDC):</label>
        
<input
    type="number"
    className="border rounded px-2 py-1 w-full"
    placeholder="Price"
    value={nftPrice} // Use prop
    onChange={(e) => setNftPrice(e.target.value)} // Update via callback
/>

<div className="px-6 py-3 bg-sky-200 text-blue-600 text-3xl font-extrabold rounded-md mt-4 flex items-center justify-center text-center w-full">
  Bond Amount: {Intl.NumberFormat('en-US').format(calculateBondAmount())} USD
</div>



        <label className="text-gray-700">Annual Bond Coupon Rate (%):</label>

<input
    type="number"
    step="0.01"
    className="border rounded px-2 py-1 w-full"
    placeholder="Coupon Rate"
    value={bondCouponRate} // Use prop
    onChange={(e) => setBondCouponRate(e.target.value)} // Update via callback
/>


<label className="text-gray-700">Bond Sale End Date:</label>
        <input
          type="date"
          className="border rounded px-2 py-1 w-full"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      {ownedNft ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
          onClick={handleSubmit}
          disabled={txnStatus === 'Transaction submitted...'}
        >
          Issue NFT Bond
        </button>
      ) : (
        <button
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded w-full max-w-md cursor-not-allowed"
          disabled
        >
          Issue NFT Bond
        </button>
      )}
     {/* Show Transaction Status or Errors */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default BondIssue;

