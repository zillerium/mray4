import React, { useState, useEffect } from 'react';
import InvestorPoolGraphicCom from '@/components/Pool/InvestorPoolGraphicCom';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json';
import vaultNFTAddress from '@/lib/vaultNFTAddress.json';
import GetInvestorLockedTotal from '@/components/Pool/GetInvestorLockedTotal';

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const InvestorPoolMgrGraphicCom = () => {
  const [poolData, setPoolData] = useState<[number, string][]>([]); // Array of [lockedBalance, walletAddress]
  
  // Read the contract to get all locked USDC investment details
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'getAllUsdcInvestmentDetails',
  });

useEffect(() => {
  if (data && Array.isArray(data)) {
    if (data.length === 0) {
      setPoolData([]);
    } else {
      const processedData = data.map((entry: { lockedBalance: bigint; walletAddress: string }) => [
        parseInt(entry.lockedBalance.toString(), 10), // Convert balance to integer
        entry.walletAddress, // Wallet address
      ]) as [number, string][];
      setPoolData(processedData);
    }
  }
}, [data]);


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
          Locked USDC Value <GetInvestorLockedTotal />
        </span>
      </h2>
      <br />
      {/* Donut Chart */}
      <div className="mt-6">
        {poolData.length > 0 ? (
          <InvestorPoolGraphicCom poolData={poolData} />
        ) : (
          <p className="text-gray-700 text-lg">No investments in Pool</p>
        )}
      </div>
      {error && <p className="text-red-500">Error fetching pool data</p>}
    </div>
  );
};

export default InvestorPoolMgrGraphicCom;

