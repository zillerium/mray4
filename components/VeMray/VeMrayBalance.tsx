import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json'; // Include the correct ABI for VeMint
import usdcTreasuryContractAddress from '@/lib/usdcTreasuryAddress.json'; // VeMint contract address
import CopyText from '@/components/Util/CopyText';

interface VeMrayBalanceProps {
  walletAddress: string;
}

const contractAddress = usdcTreasuryContractAddress.address as `0x${string}`;

const VeMrayBalance: React.FC<VeMrayBalanceProps> = ({ walletAddress }) => {
  const [balance, setBalance] = useState<string>(''); // State to store the balance

  const { data, error: balanceError } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'veMrayBalance', 
    args: [walletAddress],
  });

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setBalance(data.toString()); // Convert BigInt to string
    } else if (balanceError) {
      setBalance('Error fetching balance');
    } else {
      setBalance('0'); // Default to '0' if data is undefined or null and there’s no error
    }
  }, [data, balanceError]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">veMRay Balance</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left font-semibold border-b">
                Wallet
              </th>
              <th className="py-2 px-4 text-left font-semibold border-b">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">
                <CopyText copiedText={walletAddress} />
              </td>
              <td className="py-2 px-4 border-b">{balance || 'Loading...'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VeMrayBalance;
