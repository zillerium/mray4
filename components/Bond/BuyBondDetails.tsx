import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import nftVeValContractABI from "@/lib/bondTreasuryABI.json";
import nftVeValContractAddress from "@/lib/bondTreasuryAddress.json";
import BondTable from '@/components/Bond/BondTable';

const contractAddress = nftVeValContractAddress.address as `0x${string}`;

interface BuyBondDetailsProps {
  nftId: string | number;
  onVotingStateChange?: (active: boolean) => void; // Optional prop
}
const BuyBondDetails: React.FC<BuyBondDetailsProps> = ({ nftId, onVotingStateChange }) => {

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
    functionName: 'getBondAndNftDetails',
    args: [nftId],
  });

useEffect(() => {
  if (data !== undefined && data !== null) {
    try {
      const {
        bondDetails: {
          bondAmount,
          bondMaturity,
          bondSalePeriodEnd,
          totalBondSupply,
          remainingBondSupply,
        },
        nftDetails: { nftPrice },
      } = data as {
        bondDetails: {
          bondAmount: BigInt;
          bondMaturity: BigInt;
          bondSalePeriodEnd: BigInt;
          totalBondSupply: BigInt;
          remainingBondSupply: BigInt;
        };
        nftDetails: {
          nftPrice: BigInt;
        };
      };

      // Convert BigInt to number explicitly
      setNftPrice(Number(nftPrice));
      setBondAmount(Number(bondAmount));
      setBondMaturity(new Date(Number(bondMaturity) * 1000).toISOString().split('T')[0]);
      setBondSalePeriodEnd(new Date(Number(bondSalePeriodEnd) * 1000).toISOString().split('T')[0]);
      setTotalBondSupply(Number(totalBondSupply));
      setRemainingBondSupply(Number(remainingBondSupply));
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
console.log(" data ==== ", data)
  return (
    <BondTable
      nftPrice={nftPrice}
      bondAmount={bondAmount}
      bondMaturity={bondMaturity}
      bondSalePeriodEnd={bondSalePeriodEnd}
      totalBondSupply={totalBondSupply}
      remainingBondSupply={remainingBondSupply}
    />
  );
};

export default BuyBondDetails;

