import React, { useState, useEffect } from 'react';
import PoolGraphicCom from '@/components/Pool/PoolGraphicCom';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json';
import vaultNFTAddress from '@/lib/vaultNFTAddress.json';
import GetLockedTotal from '@/components/Pool/GetLockedTotal';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

const contractAddress = vaultNFTAddress.address as `0x${string}`;

const PoolMgrGraphicCom = () => {
  const [poolData, setPoolData] = useState<[number, number][]>([]);

  // Read the contract to get all locked NFT details
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'getAllLockedNFTDetails',
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setPoolData([]);
      } else {
        const processedData = data.map(
          (entry: { lockedValue: bigint; nftId: bigint }) => [
            parseInt(entry.lockedValue.toString(), 10) / CURRENCY_FACTOR,
            parseInt(entry.nftId.toString(), 10),
          ],
        ) as [number, number][];
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
          Locked NFT Value <GetLockedTotal />
        </span>
      </h2>
      <br />
      {/* Donut Chart */}
      <div className="mt-6">
        {poolData.length > 0 ? (
          <PoolGraphicCom poolData={poolData} />
        ) : (
          <p className="text-gray-700 text-lg">No assets in Pool</p>
        )}
      </div>
      {error && <p className="text-red-500">Error fetching pool data</p>}
    </div>
  );
};

export default PoolMgrGraphicCom;
