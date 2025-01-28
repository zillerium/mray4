import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import UnifiedNFTABI from '@/lib/uniContractABI.json'; // ABI for UnifiedNFT contract
import UnifiedNFTAddress from '@/lib/uniContractAddress.json'; // Contract address for UnifiedNFT
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json'; // Treasury contract address
import CopyText from '@/components/Util/CopyText'; // Component to shorten address display

interface CheckTreasuryApprovalProps {
  nftId: number; // ID of the NFT to check
}

const CheckTreasuryApproval: React.FC<CheckTreasuryApprovalProps> = ({ nftId }) => {
  const contractAddress = UnifiedNFTAddress.address as `0x${string}`;
  const bondContractAddress = bondTreasuryContractAddress.address as `0x${string}`;

  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  // Call the `getApproved` function from the smart contract
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: UnifiedNFTABI,
    functionName: 'getApproved',
    args: [nftId], // Pass the nftId to the contract
  });

  useEffect(() => {
    if (data !== undefined) {
      // Check if the returned address matches the bondContractAddress
      setIsApproved(data === bondContractAddress);
    } else if (isError) {
      setIsApproved(null); // Reset if there is an error
    }
  }, [data, isError, bondContractAddress]);

  return (
    <div>
      {isLoading && <p>Checking Treasury Approval for NFT {nftId}...</p>}
      {!isLoading && isApproved !== null && (
        <div>
          <p>
            Treasury is{' '}
            <span className={isApproved ? 'text-green-500' : 'text-red-500'}>
              {isApproved ? 'Approved' : 'Not Approved'}
            </span>{' '}
            for NFT {nftId}.
          </p>
          <p>
            Bond Treasury: <CopyText copiedText={bondContractAddress} />
          </p>
        </div>
      )}
      {!isLoading && isApproved === null && (
        <p className="text-red-500">
          Error checking Treasury approval status for NFT {nftId}.
        </p>
      )}
    </div>
  );
};

export default CheckTreasuryApproval;

