import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondContractABI from "@/lib/bondTreasuryABI.json";
import bondContractAddress from "@/lib/bondTreasuryAddress.json";
import BondTable from '@/components/Bond/BondTable';

const contractAddress = bondContractAddress.address as `0x${string}`;

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
  const [noBondIssued, setNoBondIssued] = useState(false); // New state for bond issuance

  const { data, error: bondDetailsError } = useContractRead({
    address: contractAddress,
    abi: bondContractABI,
    functionName: 'getBondAndNftDetails',
    args: [nftId],
  });

console.log(" data in bond buy ==== ", data)

  useEffect(() => {
    if (data) {
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

        // Parse bond details
        setNftPrice(Number(nftPrice));
        setBondAmount(Number(bondAmount));
        setBondMaturity(new Date(Number(bondMaturity) * 1000).toISOString().split('T')[0]);
        setBondSalePeriodEnd(new Date(Number(bondSalePeriodEnd) * 1000).toISOString().split('T')[0]);
        setTotalBondSupply(Number(totalBondSupply));
        setRemainingBondSupply(Number(remainingBondSupply));
        setNoBondIssued(false); // Clear no bond state
      } catch (e) {
        console.error('Error parsing bond details:', e);
      }
    } else if (bondDetailsError && bondDetailsError.message.includes('No active bond')) {
      setNoBondIssued(true); // No bond has been issued
    }
  }, [data, bondDetailsError]);

  if (noBondIssued) {
    return (
      <div className="flex justify-center items-center mt-4">
        <p className="text-gray-700 text-lg">No issued bond</p>
      </div>
    );
  }

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

