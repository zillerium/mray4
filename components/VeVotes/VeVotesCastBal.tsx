import React, { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import nftVeValContractABI from '@/lib/bondTreasuryABI.json';
import nftVeValContractAddress from '@/lib/bondTreasuryAddress.json';
import VotesTable from '@/components/VeVotes/VotesTable'; // Import the VotesTable component
import VotesSummary from '@/components/VeVotes/VotesSummary'; // Import the VotesSummary component
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

const contractAddress = nftVeValContractAddress.address as `0x${string}`;

interface Vote {
  voter: string;
  votes: bigint;
  price: bigint;
}

const VeVotesCastBal: React.FC<{
  nftOwner: string;
  nftId: number;
  onVotesCastChange: (votesCast: number) => void;
}> = ({ nftOwner, nftId, onVotesCastChange }) => {
  const { isConnected } = useAccount();

  // Use useContractRead to call getVotesForNFT function from the smart contract
  const { data, isLoading, error } = useContractRead({
    address: contractAddress,
    abi: nftVeValContractABI,
    functionName: 'getVotesForNFT',
    args: [nftId],
  });

  const votesData = data as Vote[] | undefined;

  useEffect(() => {
    if (votesData) {
      // Calculate and update the total votes cast
      const totalVotesCast = votesData.reduce(
        (total, vote) => total + Number(vote.votes),
        0,
      );
      onVotesCastChange(totalVotesCast);
    }

    if (error) {
      console.error('Error fetching votes data:', error);
    }
  }, [votesData, error, nftId, onVotesCastChange]);

  const convertedVotesData =
    votesData?.map((vote) => ({
      voter: vote.voter,
      votes: Number(vote.votes), // Convert bigint to number
      price: Number(vote.price) / CURRENCY_FACTOR,
    })) || [];

  return (
    <div>
      {isConnected ? (
        isLoading ? (
          <p>Loading vote data...</p>
        ) : (
          votesData && (
            <>
              <VotesTable votesData={convertedVotesData} />
              <VotesSummary
                votesData={votesData}
                nftId={nftId}
                nftOwner={nftOwner}
              />
            </>
          )
        )
      ) : (
        <p className="text-red-500">Not connected</p>
      )}
    </div>
  );
};

export default VeVotesCastBal;
