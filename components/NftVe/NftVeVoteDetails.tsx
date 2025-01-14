import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import nftVeValContractABI from "@/lib/bondTreasuryABI.json";
import nftVeValContractAddress from "@/lib/bondTreasuryAddress.json";
import VotingTable from './VotingTable';

const contractAddress = nftVeValContractAddress.address as `0x${string}`;

interface NftVeVoteDetailsProps {
  nftId: string | number;
  onVotingStateChange?: (active: boolean) => void; // Optional prop
}
const NftVeVoteDetails: React.FC<NftVeVoteDetailsProps> = ({ nftId, onVotingStateChange }) => {

  const [nftPrice, setNftPrice] = useState<number | null>(null);
  const [bondAmount, setBondAmount] = useState<number | null>(null);
  const [bondMaturity, setBondMaturity] = useState<string | null>(null);
  const [bondSalePeriodEnd, setBondSalePeriodEnd] = useState<string | null>(null);
  const [totalBondSupply, setTotalBondSupply] = useState<number | null>(null);
  const [remainingBondSupply, setRemainingBondSupply] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, error: bondDetailsError } = useContractRead({
    address: contractAddress,
    abi: nftVeValContractABI,
    functionName: 'getBondedNftDetails',
    args: [nftId],
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      try {
        const {
          nftPrice,
          bondAmount,
          bondMaturity,
          bondSalePeriodEnd,
          totalBondSupply,
          remainingBondSupply,
        } = data as {
          nftPrice: number;
          bondAmount: number;
          bondMaturity: number;
          bondSalePeriodEnd: number;
          totalBondSupply: number;
          remainingBondSupply: number;
        };

        setNftPrice(nftPrice);
        setBondAmount(bondAmount);
        setBondMaturity(new Date(bondMaturity * 1000).toISOString().split('T')[0]);
        setBondSalePeriodEnd(new Date(bondSalePeriodEnd * 1000).toISOString().split('T')[0]);
        setTotalBondSupply(totalBondSupply);
        setRemainingBondSupply(remainingBondSupply);
        setError(null); // Clear any errors
      } catch (e) {
        console.error('Error parsing bond details:', e);
        setError('Error processing bond details');
      }
    } else if (bondDetailsError) {
      console.error('Error fetching bond details:', bondDetailsError.message);
      setError('Error fetching bond details');
    }
  }, [data, bondDetailsError]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <VotingTable
      nftPrice={nftPrice}
      bondAmount={bondAmount}
      bondMaturity={bondMaturity}
      bondSalePeriodEnd={bondSalePeriodEnd}
      totalBondSupply={totalBondSupply}
      remainingBondSupply={remainingBondSupply}
    />
  );
};

export default NftVeVoteDetails;

