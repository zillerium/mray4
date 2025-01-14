import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // Directly import ABI
import uniContractAddress from '@/lib/uniContractAddress.json'; // Directly import contract address
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import DisplayIpfsComponentPage from '@/components/Ipfs/DisplayIpfsComponentPage'; // Component to display image
import CopyText from '@/components/Util/CopyText'; // Component for copying text
import ShowUrlLink from '@/components/Util/ShowUrlLink'; // Component for copying text

interface ReadNftByTokenNumberProps {
  tokenNumber: string;
}

// Cast the address to the expected type
const contractAddress = uniContractAddress.address as `0x${string}`;
const vaultAddress = bondTreasuryAddress.address as `0x${string}`;

const ReadNftByTokenNumber: React.FC<ReadNftByTokenNumberProps> = ({
  tokenNumber,
}) => {
  const [tokenURI, setTokenURI] = useState<string | null>(null);
  const [nftOwner, setNftOwner] = useState<string | null>(null);
  const { address: connectedWalletAddress, isConnected } = useAccount();

  const { data, error } = useContractRead({
    address: contractAddress,
    abi: uniContractABI, // Directly use the imported ABI
    functionName: 'getNftDetails',
    args: [tokenNumber],
  });

  const renderOwnershipStatus = () => {
    if (nftOwner === vaultAddress) {
      return <span className="ml-2 font-bold text-red-500">LOCKED</span>;
    }
    if (!isConnected) {
      return null; // End without showing any message
    }
    if (connectedWalletAddress === nftOwner) {
      return (
        <span className="ml-2 font-bold text-green-500">You own this NFT</span>
      );
    }
    return (
      <span className="ml-2 font-bold text-red-500">
        Someone else owns this NFT
      </span>
    );
  };

  useEffect(() => {
    if (data) {
      const [uri, owner] = data as [string, string]; // Destructure data
      setTokenURI(uri);
      setNftOwner(owner);
    } else if (error) {
      console.error('Error fetching NFT details:', error);
    }
  }, [data, error]);

  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      {tokenURI && nftOwner ? (
        <>
          <DisplayIpfsComponentPage carModelUri={tokenURI} />
          <p>NFT: {tokenNumber}</p>
          <p>
            NFT Owner:
            <div className="flex items-center">
              <CopyText copiedText={nftOwner} />
              &nbsp;
              <ShowUrlLink
                baseUrl="https://sepolia.basescan.org/address/"
                path={nftOwner}
              />
            </div>
            {renderOwnershipStatus()}
          </p>
          <p>
            Token URI:
            <div className="flex items-center">
              <CopyText copiedText={tokenURI} />
              &nbsp;
              <ShowUrlLink
                baseUrl="https://rose-wonderful-crab-70.mypinata.cloud/ipfs/"
                path={tokenURI}
              />
            </div>
          </p>
        </>
      ) : (
        <p>Loading NFT data...</p>
      )}
    </div>
  );
};

export default ReadNftByTokenNumber;
