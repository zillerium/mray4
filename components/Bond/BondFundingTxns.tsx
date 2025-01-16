import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import bondContractABI from '@/lib/bondTreasuryABI.json';
import bondContractAddress from '@/lib/bondTreasuryAddress.json';
import FundingTable from '@/components/Bond/FundingTable'; // Table to display funding transactions
import FundingSummary from '@/components/Bond/FundingSummary'; // Summary component to display totals and ClaimMRAY

const contractAddress = bondContractAddress.address as `0x${string}`;

interface FundingTxn {
  walletAddress: string;
  amount: number;
}

const BondFundingTxns: React.FC<{
  nftId: number;
  nftOwner: string;
}> = ({ nftId, nftOwner }) => {
  const { isConnected } = useAccount();
  const [fundingTxns, setFundingTxns] = useState<FundingTxn[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useContractRead({
    address: contractAddress,
    abi: bondContractABI,
    functionName: 'getFundingTxns',
    args: [nftId],
  });

  useEffect(() => {
    if (data) {
      const txns = (data as FundingTxn[]).map((txn) => ({
        walletAddress: txn.walletAddress,
        amount: Number(txn.amount),
      }));
      setFundingTxns(txns);
    }

    if (error) {
      setError('Error fetching funding transactions.');
    }
  }, [data, error]);

  const totalFunding = fundingTxns.reduce((total, txn) => total + txn.amount, 0);

  return (
    <div>
      {isConnected ? (
        isLoading ? (
          <p>Loading funding transactions...</p>
        ) : fundingTxns.length > 0 ? (
          <>
            <FundingTable fundingTxns={fundingTxns} />
            <FundingSummary totalFunding={totalFunding} nftId={nftId} nftOwner={nftOwner} />
          </>
        ) : (
          <p>No funding transactions found for this NFT.</p>
        )
      ) : (
        <p className="text-red-500">Not connected</p>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BondFundingTxns;


