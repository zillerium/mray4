import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import UnifiedNFTABI from '@/lib/uniContractABI.json'; // ABI for UnifiedNFT contract
import UnifiedNFTAddress from '@/lib/uniContractAddress.json'; // Contract address for UnifiedNFT
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json'; // Treasury contract address
import CopyText from '@/components/Util/CopyText'; // Component to shorten address display
import { Check, X } from 'lucide-react'; // Tick and cross icons from Lucide React

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
        <div className="flex items-center space-x-4">
          {isApproved ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                <Check className="text-green-500 w-5 h-5" />
              </div>
              <p className="text-green-500">Approved</p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                <X className="text-red-500 w-5 h-5" />
              </div>
              <p className="text-red-500">Not Approved</p>
            </div>
          )}
          <p>
            Contract Address: <CopyText copiedText={bondContractAddress} />
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

