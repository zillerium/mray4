import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import nftVeValContractABI from "@/lib/vaultNFTABI.json"; // ABI for the contract
import nftVeValContractAddress from "@/lib/vaultNFTAddress.json"; // Contract address
import CopyText from "@/components/Util/CopyText";
import { FaExternalLinkAlt } from "react-icons/fa";
import { reformatCurrency } from "@/components/Util/ReformatCurrency";

interface SetNftVeVoteComProps {
  tokenNumber: string;
  ownedNft: boolean;
}

const contractAddress = nftVeValContractAddress.address as `0x${string}`;

// Function to convert date to Unix timestamp
function convertToUnixTimestamp(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  return Math.floor(new Date(Date.UTC(year, month - 1, day)).getTime() / 1000);
}

const SetNftVeVoteCom: React.FC<SetNftVeVoteComProps> = ({
  tokenNumber,
  ownedNft,
}) => {
  const [lowerLimit, setLowerLimit] = useState<string>("");
  const [upperLimit, setUpperLimit] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleSubmit = async () => {
    if (!tokenNumber || !lowerLimit || !upperLimit || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const unixTimestamp = convertToUnixTimestamp(endDate);

      const reformattedLowerLimit = reformatCurrency(lowerLimit);
      const reformattedUpperLimit = reformatCurrency(upperLimit);

      if (reformattedLowerLimit === null || reformattedUpperLimit === null) {
        alert("Please enter valid numeric values for limits.");
        return;
      }

      writeContract({
        address: contractAddress,
        abi: nftVeValContractABI,
        functionName: "setNftVeVote",
        args: [
          Number(tokenNumber),
          reformattedLowerLimit,
          reformattedUpperLimit,
          unixTimestamp,
        ],
      });

      setTxnStatus("Transaction submitted...");
    } catch (e) {
      console.error("Transaction failed:", e);
      setTxnStatus("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Valuation Input Fields */}
      <div className="flex flex-col items-start space-y-2 w-full max-w-md">
        <label className="text-gray-700">Lower Limit:</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter lower limit"
          value={lowerLimit}
          onChange={(e) => setLowerLimit(e.target.value)}
        />
        <label className="text-gray-700">Upper Limit:</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter upper limit"
          value={upperLimit}
          onChange={(e) => setUpperLimit(e.target.value)}
        />
        <label className="text-gray-700">Voting End Date (YYYY-MM-DD):</label>
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
          disabled={txnStatus === "Transaction submitted..."}
        >
          Submit Valuation and Start Voting
        </button>
      ) : (
        <button
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded w-full max-w-md cursor-not-allowed"
          disabled
        >
          Submit Valuation and Start Voting
        </button>
      )}

      {/* Status and Transaction Info */}
      <div className="w-full max-w-md">
        {txnStatus && (
          <div className="text-gray-600 text-sm mt-2">{txnStatus}</div>
        )}
        {transactionHash && (
          <div className="text-sm mt-2 flex items-center">
            Transaction Hash: <CopyText copiedText={transactionHash} />{" "}
            <a
              href={`https://sepolia.basescan.org/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-500"
            >
              <FaExternalLinkAlt className="inline-block" />
            </a>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            Error: {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SetNftVeVoteCom;

