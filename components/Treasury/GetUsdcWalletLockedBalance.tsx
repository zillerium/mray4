import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // ABI for the vault contract
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json'; // Address for the vault contract

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const GetUsdcWalletLockedBalance: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const [lockedBalance, setLockedBalance] = useState<string | null>(null);

  const {
    refetch,
  } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'getUsdcTreasuryWalletBalance',
    args: [walletAddress],
  });

  const handleGetBalanceClick = async () => {
    try {
      const result = await refetch();
      if (result.data) {
        const formattedBalance = (Number(result.data) / 10 ** 6).toFixed(2); // Convert to USDC format
        setLockedBalance(formattedBalance);
      } else {
        setLockedBalance('0.00');
      }
    } catch (e) {
      console.error('Error fetching USDC Treasury balance:', e);
      setLockedBalance('0.00');
    }
  };

  return (
    <div
      className="flex items-center justify-between w-full bg-white shadow-md rounded-lg p-4"
      style={{
        border: '1px solid #e5e7eb', // Light gray border
        gap: '0.5rem', // Spacing between elements
      }}
    >
      {/* Title */}
      <span className="text-xl font-bold text-gray-700">Free Treasury USDC:</span>

      {/* Balance */}
      <span className="text-xl font-bold text-gray-900">
        {lockedBalance !== null ? `${lockedBalance} USDC` : ''}
      </span>

      {/* Button */}
      <button
        onClick={handleGetBalanceClick}
        className="text-white bg-blue-500 hover:bg-blue-600 font-bold rounded-full flex items-center justify-center"
        style={{
          fontSize: '1.5rem', // Font size for "+"
          width: '2.5rem', // Circle size
          height: '2.5rem', // Circle size
        }}
      >
        +
      </button>
    </div>
  );
};

export default GetUsdcWalletLockedBalance;

