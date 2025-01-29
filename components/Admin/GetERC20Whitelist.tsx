import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import mintABI from '@/lib/mintContractABI.json'; // ABI for USDC Treasury contract
import mintAddress from '@/lib/mintContractAddress.json'; // Contract address for USDC Treasury
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Input for whitelist check

const GetERC20Whitelist: React.FC = () => {
  const [status, setStatus] = useState<'Set' | 'Not Set' | null>(null);

  const contractAddress = mintAddress.address as `0x${string}`;
  const checkAddress = bondTreasuryAddress.address;

  // Call the `whitelist` mapping with bondTreasuryAddress as the input
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: mintABI,
    functionName: 'whitelist',
    args: [checkAddress],
  });

  // Update the status based on the result
  useEffect(() => {
    if (data !== undefined) {
      const isWhitelisted = data as boolean;
      setStatus(isWhitelisted ? 'Set' : 'Not Set');
    } else if (isError) {
      setStatus('Not Set');
    }
  }, [data, isError]);

  return (
    <div>
      {isLoading && <p>Checking Whitelist Status...</p>}
      {!isLoading && status && (
        <p className={status === 'Set' ? 'text-green-500' : 'text-red-500'}>
          {status}
        </p>
      )}
    </div>
  );
};

export default GetERC20Whitelist;

