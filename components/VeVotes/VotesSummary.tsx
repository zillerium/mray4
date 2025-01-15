// ./components/VotesSummary.tsx

import React from 'react';
import ClaimMRAY from '@/components/Bond/ClaimMRAY';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

interface VotesSummaryProps {
  votesData: {
    voter: string;
    votes: bigint;
    price: bigint;
  }[];
  nftId: number;
  nftOwner: string;
}

const VotesSummary: React.FC<VotesSummaryProps> = ({
  votesData,
  nftId,
  nftOwner,
}) => {
  const totalVotes = votesData.reduce(
    (acc, vote) => acc + vote.votes,
    BigInt(0),
  );
  const weightedVotes = votesData.reduce(
    (acc, vote) => acc + vote.votes * vote.price,
    BigInt(0),
  );

  const weightedAverageEth =
    totalVotes > BigInt(0)
      ? Number(weightedVotes) / Number(totalVotes) / CURRENCY_FACTOR
      : 0;

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Summary</h3>
      <p className="text-sm">
        <span className="font-semibold">Total Weighted Votes (in USD):</span>{' '}
        {weightedAverageEth.toFixed(2)}
      </p>
      {/* Pass the converted price in wei to the ClaimMRAY component */}
      <ClaimMRAY nftId={nftId} nftOwner={nftOwner} />
    </div>
  );
};

export default VotesSummary;
