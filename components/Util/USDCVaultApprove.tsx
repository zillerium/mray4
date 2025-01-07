import React, { useState } from "react";
import { useContractWrite } from "wagmi";
import usdcProxyABI from "@/lib/usdcProxyABI.json";
import usdcProxyAddress from "@/lib/usdcProxyAddress.json";
import vaultNFTAddress from "@/lib/vaultNFTAddress.json";

const USDCVaultApprove: React.FC = () => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [approvalAmount, setApprovalAmount] = useState<string>("");

  const { data: transactionHash, writeContract } = useContractWrite();

  const handleApproveClick = async () => {
    if (!approvalAmount || isNaN(Number(approvalAmount))) {
      alert("Please enter a valid amount.");
      return;
    }

    const amountInSmallestUnits = BigInt(Number(approvalAmount) * 10 ** 6);

    try {
      writeContract({
        address: usdcProxyAddress.address as `0x${string}`,
        abi: usdcProxyABI,
        functionName: "approve",
        args: [vaultNFTAddress.address as `0x${string}`, amountInSmallestUnits],
      });

      setTxnStatus("Transaction submitted...");
      setErrorMessage(null);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Transaction failed:", e.message);
        setErrorMessage(e.message);
      } else {
        console.error("An unknown error occurred.");
        setErrorMessage("An unknown error occurred.");
      }
      setTxnStatus("Transaction failed");
    }

  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Input and Button Container */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 w-full max-w-md">
        {/* Input Field */}
        <input
          type="number"
          placeholder="Enter USDC Amount"
          value={approvalAmount}
          onChange={(e) => setApprovalAmount(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-2/3 text-lg"
          style={{ marginRight: "0.5rem" }}
        />

        {/* Button */}
        <button
          className={`flex items-center justify-center bg-blue-500 text-white font-bold px-6 py-2 rounded-full ${
            txnStatus === "Transaction submitted..." ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleApproveClick}
          disabled={txnStatus === "Transaction submitted..."}
          style={{ width: "30%" }}
        >
          {txnStatus === "Transaction submitted..." ? (
            "Processing..."
          ) : (
            <>
              Approve
            </>
          )}
        </button>
      </div>

      {/* Transaction Status and Error Messages */}
      {(txnStatus || errorMessage || transactionHash) && (
        <div className="w-full max-w-md bg-gray-100 border border-gray-300 rounded-lg p-4 mt-4">
          {txnStatus && <p className="text-gray-700 mb-2"><strong>Status:</strong> {txnStatus}</p>}
          {errorMessage && <p className="text-red-500 mb-2"><strong>Error:</strong> {errorMessage}</p>}
          {transactionHash && (
            <p className="text-green-500 mb-2">
              <strong>Transaction Hash:</strong>{" "}
              <a
                href={`https://sepolia.basescan.org/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {transactionHash}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default USDCVaultApprove;

