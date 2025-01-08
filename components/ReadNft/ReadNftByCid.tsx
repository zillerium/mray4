// components/ReadNftByCid.tsx

import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // Directly import ABI
import uniContractAddress from '@/lib/uniContractAddress.json'; // Directly import contract address

interface ReadNftByCidProps {
  ipfsCid: string;
}

// Cast the address to the expected type
const contractAddress = uniContractAddress.address as `0x${string}`;

const ReadNftByCid: React.FC<ReadNftByCidProps> = ({ ipfsCid }) => {
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, error } = useContractRead({
    address: contractAddress,
    abi: uniContractABI, // Directly use the imported ABI
    functionName: 'cidToTokenId',
    args: [ipfsCid],
  });

  useEffect(() => {
    if (data) {
      setTokenId(data.toString());
    } else if (error) {
      setErrorMessage(
        `Error fetching data from the contract: ${error.message}`,
      );
    }
  }, [data, error]);

  return (
    <div className="mt-4 p-4 bg-white shadow rounded">
      <h2 className="font-mono mb-4">NFT Data by IPFS CID</h2>
      <p>IPFS CID: {ipfsCid}</p>
      {errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <p>
          Token Number:{' '}
          {tokenId !== null ? tokenId : 'Fetching token number...'}
        </p>
      )}
    </div>
  );
};

export default ReadNftByCid;
