import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // ABI for USDC Treasury contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Contract address for USDC Treasury
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Expected Bond Treasury address

const GetUSDCTreasuryBond: React.FC = () => {
  const [status, setStatus] = useState<'Set' | 'Not Set' | null>(null);

  const contractAddress = usdcTreasuryAddress.address as `0x${string}`;
  const expectedAddress = bondTreasuryAddress.address;

  // Call the `BondTreasuryContractAddress` function from the smart contract
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'BondTreasuryContractAddress',
  });

  // Check if the fetched value matches the expected Bond Treasury address
  useEffect(() => {
    if (data) {
      const fetchedAddress = data as string;
      if (fetchedAddress.toLowerCase() === expectedAddress.toLowerCase()) {
        setStatus('Set');
      } else {
        setStatus('Not Set');
      }
    } else if (isError) {
      setStatus('Not Set');
    }
  }, [data, isError, expectedAddress]);

  return (
    <div>
      {isLoading && <p>Loading Bond Treasury Status...</p>}
      {!isLoading && status && (
        <p className={status === 'Set' ? 'text-green-500' : 'text-red-500'}>
          {status}
        </p>
      )}
    </div>
  );
};

export default GetUSDCTreasuryBond;

