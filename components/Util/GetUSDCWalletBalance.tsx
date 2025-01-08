import React, { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import usdcABI from '@/lib/usdcABI.json'; // ABI for the USDC token
import usdcContractAddress from '@/lib/usdcAddress.json'; // Address of the USDC token contract

const GetUSDCWalletBalance: React.FC = () => {
  const { address: connectedWalletAddress } = useAccount();
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);

  const { refetch } = useContractRead({
    address: usdcContractAddress.address as `0x${string}`,
    abi: usdcABI,
    functionName: 'balanceOf',
    args: [connectedWalletAddress],
  });

  const handleGetBalanceClick = async () => {
    try {
      const result = await refetch();
      if (result.data) {
        const balance = (Number(result.data) / 10 ** 6).toFixed(2); // Convert to USDC format
        setUsdcBalance(balance); // Set formatted balance
      } else {
        setUsdcBalance('0.00');
      }
    } catch (e) {
      console.error('Error fetching USDC balance:', e);
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
      {/* Label */}
      <span className="text-xl font-bold text-gray-700">Wallet USDC:</span>

      {/* Balance */}
      <span className="text-xl font-bold text-gray-900">
        {usdcBalance !== null ? `${usdcBalance} USDC` : ''}
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

export default GetUSDCWalletBalance;
