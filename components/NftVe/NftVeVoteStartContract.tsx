import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import nftVeValContractABI from '@/lib/vaultNFTABI.json'; // Import ABI for the veToken-based valuation contract
import nftVeValContractAddress from '@/lib/vaultNFTAddress.json'; // Import contract address for the veToken-based valuation contract
import { FaExternalLinkAlt } from 'react-icons/fa'; // Import FontAwesome icon
import CopyText from '@/components/Util/CopyText';

interface NftVeVoteStartContractProps {
  tokenNumber: string;
  endDate: string; // Selected end date in YYYYMMDD format
}

// Cast the address to the expected type
const contractAddress = nftVeValContractAddress.address as `0x${string}`;

// Function to convert date from YYYYMMDD to Unix timestamp
function convertToUnixTimestamp(dateStr: string): number {
  if (!/^\d{8}$/.test(dateStr)) {
    throw new Error('Invalid date format. Please use YYYYMMDD.');
  }

  const year = parseInt(dateStr.substring(0, 4), 10);
  const month = parseInt(dateStr.substring(4, 6), 10) - 1; // Months are 0-based
  const day = parseInt(dateStr.substring(6, 8), 10);

  return Math.floor(new Date(Date.UTC(year, month, day)).getTime() / 1000);
}

const NftVeVoteStartContract: React.FC<NftVeVoteStartContractProps> = ({
  tokenNumber,
  endDate,
}) => {
  const [txnStatus, setTxnStatus] = useState<string | null>(null);
  const { data: transactionHash, writeContract, error } = useWriteContract();

  const formattedDate = endDate.replace(/-/g, ''); // Convert to YYYYMMDD format

  const handleStartVotingClick = async () => {
    if (!tokenNumber || !endDate) {
      alert('Please enter both a valid token number and end date.');
      return;
    }

    try {
      const unixTimestamp = convertToUnixTimestamp(formattedDate);

      writeContract({
        address: contractAddress,
        abi: nftVeValContractABI,
        functionName: 'startVoting',
        args: [Number(tokenNumber), unixTimestamp],
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Token and Date Display */}
      <div className="flex flex-col items-start space-y-2 w-full max-w-md">
        <div className="text-sm text-gray-600">
          Voting End Date: {formattedDate}
        </div>
      </div>

      {/* Start Voting Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
        onClick={handleStartVotingClick}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Start Voting
      </button>

      {/* Status and Transaction Info */}
      <div className="w-full max-w-md">
        {txnStatus && (
          <div className="text-gray-600 text-sm mt-2">{txnStatus}</div>
        )}
        {transactionHash && (
          <div className="text-sm mt-2 flex items-center">
            Transaction Hash: <CopyText copiedText={transactionHash} />{' '}
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

export default NftVeVoteStartContract;
