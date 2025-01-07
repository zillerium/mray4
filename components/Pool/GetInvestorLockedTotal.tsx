import React from "react";
import { useContractRead } from "wagmi";
import vaultNFTABI from "@/lib/vaultNFTABI.json";
import vaultNFTAddress from "@/lib/vaultNFTAddress.json";

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const GetInvestorLockedTotal: React.FC = () => {
  // Fetch the total locked USDC value
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: "getTotalUsdcLockedValue",
  });

  if (error) {
    // Display a controlled error message
    return <span className="text-red-500">Error fetching total USDC locked value</span>;
  }

  if (data === undefined || data === null) {
    // Show "Loading..." only if data is not yet available
    return <span>Loading...</span>;
  }

  // Adjust total value to account for 6 decimal places of USDC
  const totalValue = data.toString();
const adjustedValue = Number(totalValue) / 1_000_000;


console.log("Raw value from contract:", totalValue);
console.log("Adjusted value:", adjustedValue, typeof adjustedValue);


  // Format the adjusted value with up to 6 decimal places
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(adjustedValue);

  return (
    <span>{adjustedValue !== 0 ? `${formattedValue} USDC` : "0 USDC"}</span>
  );
};

export default GetInvestorLockedTotal;

