import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json';
import uniContractAddress from '@/lib/uniContractAddress.json';

interface DisplayIpfsDocsProps {
  tokenNumber: string;  // The token number (NFT ID) passed to the component
}

const contractAddress = uniContractAddress.address as `0x${string}`;
const baseUrl = "https://rose-wonderful-crab-70.mypinata.cloud/ipfs/";

const DisplayIpfsDocs: React.FC<DisplayIpfsDocsProps> = ({ tokenNumber }) => {
  const [ipfsAddresses, setIpfsAddresses] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: ipfsData, error } = useContractRead({
    address: contractAddress,
    abi: uniContractABI,
    functionName: 'getIpfsAddresses',
    args: [tokenNumber],  // Pass the token number (nftId)
  });

  useEffect(() => {
    if (ipfsData) {
      setIpfsAddresses(ipfsData as string[]);
    } else if (error) {
      setErrorMessage('Error fetching IPFS addresses');
    }
  }, [ipfsData, error]);

  return (
    <div className="mt-4">
      <h5 className="font-semibold mb-4">IPFS Documents:</h5>
      {errorMessage ? (
        <div className="text-red-500">{errorMessage}</div>
      ) : (
        <div className="border rounded p-4 bg-gray-50">
          {ipfsAddresses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {ipfsAddresses.map((ipfs, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 bg-white border rounded shadow-sm"
                >
                  <span className="font-mono text-sm">
                    {index + 1}. <a
                      href={`${baseUrl}${ipfs}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {ipfs}  {/* Display only the IPFS hash (Qm...) */}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No IPFS documents found for this NFT</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayIpfsDocs;

