import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import MintMRAY from '@/components/Bond/MintMRAY';
import bondTreasuryContractABI from '@/lib/bondTreasuryABI.json'; // ABI for the bond treasury contract
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json'; // Contract address

interface GetNftApprovalProps {
  nftId: number;
  nftOwner: string;
}

interface BondData {
  bondFullyFunded: boolean;
}


const contractAddress = bondTreasuryContractAddress.address as `0x${string}`;

const ClaimMRAY: React.FC<GetNftApprovalProps> = ({ nftId, nftOwner }) => {
  const { address: connectedWalletAddress } = useAccount();
  const [bondFullyFunded, setBondFullyFunded] = useState(false);

  // Fetch the bond details using `getBondOrDefault`
  const { data: bondData, isLoading } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryContractABI,
    functionName: 'isBondActive',
    args: [nftId],
  });

console.log("data from active == ", bondData);
useEffect(() => {
console.log("data bbbbbbb from active == ", bondData);
  if (typeof bondData === 'boolean') {
    setBondFullyFunded(bondData); // Directly use bondData if it's a boolean
  } else {
    console.error('Unexpected data type for bondData:', bondData);
  }
}, [bondData]);


console.log("data from active fully funded == ", bondFullyFunded);

  return (
    <div>
      {nftOwner === connectedWalletAddress ? (
        bondFullyFunded ? (
          <MintMRAY nftId={nftId} />
        ) : (
          <div className="flex flex-col items-start space-y-2 mt-4">
            <p className="text-sm text-gray-500">Bond is not fully funded yet.</p>
            <button
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Accept Funding
            </button>
          </div>
        )
      ) : (
        <div className="flex flex-col items-start space-y-2 mt-4">
          <p className="text-sm text-red-500">Only the NFT Owner can Add</p>
          <button
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
            disabled
          >
            Accept Funding
          </button>
        </div>
      )}
    </div>
  );
};

export default ClaimMRAY;

