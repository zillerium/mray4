// components/ReadNftOwner.tsx

import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import uniContractABI from "@/lib/uniContractABI.json";
import uniContractAddress from "@/lib/uniContractAddress.json";

interface ReadNftOwnerProps {
  tokenNumber: string;
}

// Cast the address to the expected type
const contractAddress = uniContractAddress.address as `0x${string}`;

const ReadNftOwner: React.FC<ReadNftOwnerProps> = ({ tokenNumber }) => {
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null);

  const { data: owner, error } = useContractRead({
    address: contractAddress,
    abi: uniContractABI, // Directly use the imported ABI
    functionName: "ownerOf",
    args: [tokenNumber],
  });

  useEffect(() => {
    if (owner) {
      setOwnerAddress(owner.toString());
    } else if (error) {
      setOwnerAddress("Error fetching owner");
    }
  }, [owner, error]);

  return (
    <div className="mt-2">
      <h5>Owner: {ownerAddress || "Loading..."}</h5>
    </div>
  );
};

export default ReadNftOwner;

