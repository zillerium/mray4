import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import nftVeValuationABI from '@/lib/vaultNFTABI.json';
import nftVeValuationAddress from '@/lib/vaultNFTAddress.json';

interface ReadNftPriceProps {
  nftId: number;
}

const contractAddress = nftVeValuationAddress.address as `0x${string}`;

const ReadNftPrice: React.FC<ReadNftPriceProps> = ({ nftId }) => {
  const [price, setPrice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the NFT price for the specified NFT ID
  const {
    data: nftPriceData,
    error: nftPriceError,
    refetch,
  } = useContractRead({
    address: contractAddress,
    abi: nftVeValuationABI,
    functionName: 'calculateNFTValue',
    args: [nftId],
  });
  useEffect(() => {
    if (nftPriceData) {
      // Convert from wei to ether
      const priceInEth = nftPriceData.toString();
      setPrice(parseFloat(priceInEth).toFixed(2)); // Format to 2 decimals
      // setPrice(350);
    } else if (nftPriceError) {
      setError('Error fetching NFT price');
    }
  }, [nftPriceData, nftPriceError]);

  const handleGetPriceClick = () => {
    refetch(); // Fetch the balance when the button is clicked
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* NFT ID Display */}
      <div className="text-gray-700">
        <strong>NFT ID:</strong> {nftId}
      </div>

      {/* Button to Fetch Price */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGetPriceClick}
      >
        Get NFT Valuation
      </button>

      {/* Display Price */}
      {price && (
        <div className="text-lg mt-2">
          <strong>Price:</strong> {price}
        </div>
      )}

      {/* Error Handling */}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ReadNftPrice;
