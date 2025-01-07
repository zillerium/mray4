import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import nftVeValuationABI from "@/lib/vaultNFTABI.json"; // ABI for NftVeValuation contract
import nftVeValuationAddress from "@/lib/vaultNFTAddress.json"; // Contract address for NftVeValuation

const contractAddress = nftVeValuationAddress.address as `0x${string}`;

const ReadNftPrice: React.FC = () => {
  const [nftId, setNftId] = useState<string>("");
  const [nftPrice, setNftPrice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, error: contractError, refetch } = useContractRead({
    address: contractAddress,
    abi: nftVeValuationABI,
    functionName: "calculateNFTValue",
    args: [Number(nftId)],
  });

  useEffect(() => {
    if (contractError) {
      console.error("Error fetching NFT price:", contractError.message);
      setError("Error fetching NFT price.");
    } else if (data) {
      const priceInEther = Number(data) / 1e18; // Convert from wei to ether
      setNftPrice(priceInEther.toFixed(2)); // Format to 2 decimal places
      setError(null);
    }
  }, [data, contractError]);

  const handleGetPriceClick = () => {
    if (!nftId) {
      setError("Please enter a valid NFT ID.");
      return;
    }
    refetch(); // Refetch the price for the specified NFT ID
  };

  return (
    <div className="mt-8 flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold mb-4">NFT Price</h2>
      
      {/* NFT ID Input */}
      <input
        type="number"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
        placeholder="Enter NFT ID"
        className="px-3 py-2 border rounded-md w-64"
      />

      {/* Button to Fetch Price */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleGetPriceClick}
      >
        Get NFT Price
      </button>

      {/* Display Price */}
      {nftPrice && (
        <div className="text-lg mt-2">
          <strong>Price:</strong> {nftPrice} <span> USD</span>
        </div>
      )}

      {/* Error Handling */}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default ReadNftPrice;

