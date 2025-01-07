import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import nftVeValContractABI from "@/lib/vaultNFTABI.json";
import nftVeValContractAddress from "@/lib/vaultNFTAddress.json";
import { CURRENCY_FACTOR } from "@/components/Util/ReformatCurrency";

import VotingTable from './VotingTable';

const contractAddress = nftVeValContractAddress.address as `0x${string}`;

interface NftVeVoteDetailsProps {
  nftId: string | number;
  onVotingStateChange?: (active: boolean) => void; // Add this line
}

function convertUnixTimestampToDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const NftVeVoteDetails: React.FC<NftVeVoteDetailsProps> = ({ nftId, onVotingStateChange }) => {
  const [lowerLimit, setLowerLimit] = useState<number | null>(null);
  const [upperLimit, setUpperLimit] = useState<number | null>(null);
  const [votingActive, setVotingActive] = useState<boolean | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: valuationData, error: valuationError } = useContractRead({
    address: contractAddress,
    abi: nftVeValContractABI,
    functionName: 'nftValuations',
    args: [nftId],
  });

  useEffect(() => {
    if (valuationData && Array.isArray(valuationData) && valuationData.length === 4) {
      try {
        const lowerLimitString = valuationData[0]?.toString() || '0';
        const upperLimitString = valuationData[1]?.toString() || '0';
        const votingActiveBool = Boolean(valuationData[2]);
        const endDateUnix = parseInt(valuationData[3]?.toString() || '0', 10);

        setLowerLimit(Number(lowerLimitString) / CURRENCY_FACTOR);
        setUpperLimit(Number(upperLimitString) / CURRENCY_FACTOR);
        setVotingActive(votingActiveBool);
        setEndDate(convertUnixTimestampToDate(endDateUnix));

        if (onVotingStateChange) {
          onVotingStateChange(votingActiveBool); // Notify parent of voting state
        }
      } catch (error) {
        console.error('Error converting data:', error);
        setError('Error converting data');
      }
    } else if (valuationError) {
      console.error(`Error fetching valuation for NFT ID ${nftId}:`, valuationError.message);
      setError('Error fetching valuation data');
    }
  }, [valuationData, valuationError, onVotingStateChange]);

  return (
    <div className="mt-4">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <VotingTable
          lowerLimit={lowerLimit}
          upperLimit={upperLimit}
          endDate={endDate}
          votingActive={votingActive}
        />
      )}
    </div>
  );
};

export default NftVeVoteDetails;


