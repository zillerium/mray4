// components/ReadTokenCounter.tsx

import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // Directly import ABI
import uniContractAddress from '@/lib/uniContractAddress.json'; // Directly import contract address

interface ReadTokenCounterProps {
  onTokenCounterRead: (counter: number) => void;
}

// Cast the address to the expected type
const contractAddress = uniContractAddress.address as `0x${string}`;

const ReadTokenCounter: React.FC<ReadTokenCounterProps> = ({
  onTokenCounterRead,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, error } = useContractRead({
    address: contractAddress,
    abi: uniContractABI, // Directly use the imported ABI
    functionName: 'tokenCounter',
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      // Check that data is not undefined or null
      let counter = parseInt(data.toString() ?? '0', 10); // Safely convert to integer with a fallback
      counter = counter > 0 ? counter - 1 : 0; // Adjust based on your logic
      onTokenCounterRead(counter);
    } else if (error) {
      console.error('Error fetching data from contract:', error);
      setErrorMessage(`Error fetching data from contract: ${error.message}`);
    }
  }, [data, error, onTokenCounterRead]);

  return <div>{errorMessage ? <p>{errorMessage}</p> : <p></p>}</div>;
};

export default ReadTokenCounter;
