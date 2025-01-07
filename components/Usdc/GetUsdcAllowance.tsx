import React, { useState } from "react";
import { useContractRead } from "wagmi";
import vaultNFTAddress from "@/lib/vaultNFTAddress.json"; // Address for the vault contract
import usdcABI from "@/lib/usdcABI.json"; // ABI for the USDC contract
import usdcAddress from "@/lib/usdcAddress.json"; // Address for the USDC contract

const vaultAddress = vaultNFTAddress.address as `0x${string}`;
const usdcContractAddress = usdcAddress.address as `0x${string}`;

const GetUsdcAllowance: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const [allowance, setAllowance] = useState<string | null>(null);

  const { data: allowanceData } = useContractRead({
    address: usdcContractAddress,
    abi: usdcABI,
    functionName: "allowance",
    args: [walletAddress, vaultAddress],
  });

  const handleGetAllowanceClick = () => {
    try {
      if (allowanceData && typeof allowanceData === "bigint") {
        const formattedAllowance = Number(allowanceData) / 10 ** 6; // Convert to USDC format
        setAllowance(formattedAllowance.toFixed(2)); // Set formatted allowance
      } else {
        setAllowance("0.00");
      }
    } catch (e) {
      console.error("Error processing allowance data:", e);
      setAllowance("0.00");
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full bg-white shadow-md rounded-lg p-4"
      style={{
        border: "1px solid #e5e7eb", // Light gray border
        gap: "0.5rem", // Spacing between elements
      }}
    >
      <span className="text-xl font-bold text-gray-700">USD Allowance:</span>
      <span className="text-xl font-bold text-gray-900">
        {allowance ? `${allowance} USDC` : ""}
      </span>
      <button
        onClick={handleGetAllowanceClick}
        className="text-white bg-blue-500 hover:bg-blue-600 font-bold rounded-full flex items-center justify-center"
        style={{
          fontSize: "1.5rem", // Font size for "+"
          width: "2.5rem", // Circle size
          height: "2.5rem", // Circle size
        }}
      >
        +
      </button>
    </div>
  );
};

export default GetUsdcAllowance;

