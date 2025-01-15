import React, { useState, useEffect } from 'react';
import DisplayTreasuryUsdcChart from '@/components/Treasury/DisplayTreasuryUsdcChart';
import { useContractRead } from 'wagmi';
import usdcTreasuryABI from '@/lib/usdcTreasuryABI.json';
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json';
import GetInvestorLockedTotal from '@/components/Treasury/GetInvestorLockedTotal';

const contractAddress = usdcTreasuryAddress.address as `0x${string}`;

const UsdcTreasuryGraphicCom = () => {
  const [poolData, setPoolData] = useState<[number, string][]>([]); // Array of [usdcBalance, externalWalletAddress]

  // Read the contract to get all locked USDC investment details
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: usdcTreasuryABI,
    functionName: 'getAllUsdcInvestmentDetails',
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setPoolData([]);
      } else {
        const processedData = data.map(
          (entry: { usdcBalance: bigint; externalWalletAddress: string }) => [
            parseInt(entry.usdcBalance.toString(), 10), // Convert balance to integer
            entry.externalWalletAddress, // Wallet address
          ],
        ) as [number, string][];
        setPoolData(processedData);
      }
    }
  }, [data]);
 console.log(" error ====> ", error)
  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
      <h2
        className="text-2xl md:text-3xl font-normal leading-tight mt-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
      >
        <span
          className="text-3xl md:text-4xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          Free Treasury Balance <GetInvestorLockedTotal />
        </span>
      </h2>
      <br />
      {/* Donut Chart */}
      <div className="mt-6">
        {poolData.length > 0 ? (
          <DisplayTreasuryUsdcChart poolData={poolData} />
        ) : (
          <p className="text-gray-700 text-lg">No investments in Pool</p>
        )}
      </div>
      {error && <p className="text-red-500">Error fetching pool data from pool</p>}
    </div>
  );
};

export default UsdcTreasuryGraphicCom;
