// FundingSummary.tsx
import React from 'react';
import ClaimMRAY from '@/components/Bond/ClaimMRAY';

interface FundingSummaryProps {
  totalFunding: number;
  nftId: number;
  nftOwner: string;
}

const FundingSummary: React.FC<FundingSummaryProps> = ({ totalFunding, nftId, nftOwner }) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Funding Summary</h3>
      <p className="text-sm">
        <span className="font-semibold">Total Funding Amount:</span> ${totalFunding.toFixed(2)}
      </p>
      <ClaimMRAY nftId={nftId} nftOwner={nftOwner} />
    </div>
  );
};

export default FundingSummary;
