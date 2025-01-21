import React, { useState, useEffect } from 'react';
import DisplayTreasuryNftChart from '@/components/Treasury/DisplayTreasuryNftChart';
import { useContractRead } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import GetBondTreasuryBalance from '@/components/Bond/GetBondTreasuryBalance';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

const GetBondTreasuryDetails = () => {
  const [poolData, setPoolData] = useState<[number, number][]>([]);

  // Read the contract to get all locked NFT details
  const { data, error } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryABI,
    functionName: 'getBondedNftPrices',
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setPoolData([]);
      } else {
        const processedData = data.map(
          (entry: { nftPrice: bigint; nftId: bigint }) => [
            parseInt(entry.nftPrice.toString(), 10) / CURRENCY_FACTOR,
            parseInt(entry.nftId.toString(), 10),
          ],
        ) as [number, number][];
        setPoolData(processedData);
      }
    }
  }, [data]);

console.log(" chart ============== ", poolData)

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
         NFT Treasury Value <GetBondTreasuryBalance />
        </span>
      </h2>
      <br />
      {/* Donut Chart */}
      <div className="mt-6">
        {poolData.length > 0 ? (
          <DisplayTreasuryNftChart poolData={poolData} />
        ) : (
          <p className="text-gray-700 text-lg">No assets in USDC Treasury</p>
        )}
      </div>
      {error && <p className="text-red-500">Error fetching pool data</p>}
    </div>
  );
};

export default GetBondTreasuryDetails;
