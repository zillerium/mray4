import React, { useEffect } from 'react';
import { useContractRead } from 'wagmi';
import UnifiedNFTABI from '@/lib/uniContractABI.json'; // ABI for UnifiedNFT contract
import UnifiedNFTAddress from '@/lib/uniContractAddress.json'; // Contract address for UnifiedNFT

interface CheckDocUserProps {
  walletAddress: string; // Wallet address to check
  nftId: number; // NFT ID to check ownership or permissions for
  onResult: (isDocUser: boolean) => void; // Callback to pass the result back to the parent
}

const CheckDocUser: React.FC<CheckDocUserProps> = ({
  walletAddress,
  nftId,
  onResult,
}) => {
  const contractAddress = UnifiedNFTAddress.address as `0x${string}`;

  // Call the `isDocUser` function from the smart contract
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: UnifiedNFTABI,
    functionName: 'isDocUser',
    args: [walletAddress, nftId], // Arguments for the isDocUser function
  });

  // Update the parent component with the result when data is available
  useEffect(() => {
    if (data !== undefined) {
      onResult(data as boolean); // Pass the result (true/false) to the parent
    } else if (isError) {
      onResult(false); // Pass `false` if there is an error
    }
  }, [data, isError, onResult]);

  return (
    <div>
      {isLoading && <p>Checking Permissions...</p>}
      {!isLoading && isError && (
        <p className="text-red-500">Error checking doc user status.</p>
      )}
    </div>
  );
};

export default CheckDocUser;
