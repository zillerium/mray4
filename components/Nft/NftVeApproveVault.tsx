import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import uniContractABI from "@/lib/uniContractABI.json"; // ABI for the NFT contract
import uniContractAddress from "@/lib/uniContractAddress.json"; // Address for the NFT contract
import vaultNFTAddress from "@/lib/vaultNFTAddress.json"; // Address for the Vault contract
import { FaExternalLinkAlt } from "react-icons/fa"; // Import FontAwesome icon
import CopyText from "@/components/Util/CopyText";

interface NftVeApproveVaultProps {
  tokenId: string;
}

const nftAddress = uniContractAddress.address as `0x${string}`;
const vaultAddress = vaultNFTAddress.address as `0x${string}`;

const NftVeApproveVault: React.FC<NftVeApproveVaultProps> = ({ tokenId }) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleApproveVaultClick = async () => {
    if (!tokenId) {
      alert("Please enter a valid token ID.");
      return;
    }

    try {
      writeContract({
        address: nftAddress,
        abi: uniContractABI,
        functionName: "approve",
        args: [vaultAddress, Number(tokenId)],
      });

      setTxnStatus("Transaction submitted...");
    } catch (e) {
      console.error("Transaction failed:", e);
      setTxnStatus("Transaction failed");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Token ID Display */}

      {/* Approve Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
        onClick={handleApproveVaultClick}
        disabled={txnStatus === "Transaction submitted..."}
      >
        Approve NFT {tokenId}
      </button>

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

export default NftVeApproveVault;

