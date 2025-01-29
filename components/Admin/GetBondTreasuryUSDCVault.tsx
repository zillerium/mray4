import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // ABI for BondTreasury contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Contract address for BondTreasury
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Expected USDC Treasury address

const GetBondTreasuryUSDCVault: React.FC = () => {
  const [status, setStatus] = useState<'Set' | 'Not Set' | null>(null);

  const contractAddress = bondTreasuryAddress.address as `0x${string}`;
  const expectedAddress = usdcTreasuryAddress.address;

  // Call the `usdcTreasuryContractAddress` function from the smart contract
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'usdcTreasuryContractAddress',
  });

  // Check if the fetched value matches the expected USDC Treasury address
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
      {isLoading && <p>Loading USDC Treasury Status...</p>}
      {!isLoading && status && (
        <p className={status === 'Set' ? 'text-green-500' : 'text-red-500'}>
          {status}
        </p>
      )}
    </div>
  );
};

export default GetBondTreasuryUSDCVault;

