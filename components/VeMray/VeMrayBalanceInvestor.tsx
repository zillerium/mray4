import React, { useState, useEffect } from "react";
import { useContractRead, useAccount } from "wagmi";
import veMintABI from "@/lib/vaultNFTABI.json"; // ABI for VeMint
import veMintContractAddress from "@/lib/vaultNFTAddress.json"; // VeMint contract address

const contractAddress = veMintContractAddress.address as `0x${string}`;

const VeMrayBalanceInvestor: React.FC = () => {
  const { address: connectedWalletAddress } = useAccount(); // Get the connected wallet
  const [balance, setBalance] = useState<string | null>(null);

  const { data: balanceData, error: balanceError, refetch } = useContractRead({
    address: contractAddress,
    abi: veMintABI,
    functionName: "veMrayBalance", // Fetch the veMRAY balance
    args: [connectedWalletAddress],
  });

  const handleGetBalanceClick = async () => {
    try {
      const result = await refetch();
      if (result.data) {
        const formattedBalance = (Number(result.data) / 10 ** 6).toFixed(2); // Convert to readable format
        setBalance(formattedBalance);
      } else {
        setBalance("0.00");
      }
    } catch (e) {
      console.error("Error fetching veMRAY balance:", e);
      setBalance("0.00");
    }
  };

  useEffect(() => {
    if (balanceData) {
      setBalance((Number(balanceData) / 10 ** 6).toFixed(2)); // Convert to readable format
    }
  }, [balanceData, balanceError]);

  return (
    <div
      className="flex items-center justify-between w-full bg-white shadow-md rounded-lg p-4"
      style={{
        border: "1px solid #e5e7eb", // Light gray border
        gap: "0.5rem",               // Spacing between elements
      }}
    >
      {/* Label */}
      <span className="text-xl font-bold text-gray-700">VeMray Balance:</span>

      {/* Balance */}
      <span className="text-xl font-bold text-gray-900">
        {balance !== null ? `${balance} veMRAY` : ""}
      </span>

      {/* Button */}
      <button
        onClick={handleGetBalanceClick}
        className="text-white bg-blue-500 hover:bg-blue-600 font-bold rounded-full flex items-center justify-center"
        style={{
          fontSize: "1.5rem", // Font size for "+"
          width: "2.5rem",    // Circle size
          height: "2.5rem",   // Circle size
        }}
      >
        +
      </button>
    </div>
  );
};

export default VeMrayBalanceInvestor;

