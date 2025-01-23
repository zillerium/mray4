import React, { useState, useEffect } from 'react';
import DisplayTreasuryBondChart from '@/components/Treasury/DisplayTreasuryBondChart';
import { useContractRead } from 'wagmi';
import bondQueryTreasuryABI from '@/lib/bondQueryTreasuryABI.json';
import bondQueryTreasuryAddress from '@/lib/bondQueryTreasuryAddress.json';
import GetBondTreasuryBalance from '@/components/Treasury/GetBondTreasuryBalance';

const contractAddress = bondQueryTreasuryAddress.address as `0x${string}`;

const GetBondTreasuryDetails = () => {
  const [poolData, setPoolData] = useState<[number, number][]>([]); // Adjusted type for bondId and bondAmount

  const { data, error } = useContractRead({
    address: contractAddress,
    abi: bondQueryTreasuryABI,
    functionName: 'getAllBondInfo',
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      if (data.length === 0) {
        setPoolData([]);
      } else {
        const processedData = data.map(
          (entry: { bondId: bigint; bondAmount: bigint }) => [
            parseInt(entry.bondId.toString(), 10), // Convert bondId to integer
            parseInt(entry.bondAmount.toString(), 10), // Convert bondAmount to integer
          ]
        ) as [number, number][];
        setPoolData(processedData);
      }
    }
  }, [data]);

  console.log('Error:', error);
  console.log('Data:', data);

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
          Bond Treasury Balance <GetBondTreasuryBalance />
        </span>
      </h2>
      <br />
      {/* Donut Chart */}
      <div className="mt-6">
        {poolData.length > 0 ? (
          <DisplayTreasuryBondChart poolData={poolData} />
        ) : (
          <p className="text-gray-700 text-lg">No bonds in the Treasury</p>
        )}
      </div>
      {error && <p className="text-red-500">Error fetching pool data from the contract</p>}
    </div>
  );
};

export default GetBondTreasuryDetails;

