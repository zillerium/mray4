import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import bondTreasuryContractABI from '@/lib/bondTreasuryABI.json';
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json';

const contractAddress = bondTreasuryContractAddress.address as `0x${string}`;

const GetBondPeriod: React.FC = () => {
  const [seconds, setSeconds] = useState<string | null>(null);
  const [days, setDays] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useContractRead({
    address: contractAddress,
    abi: bondTreasuryContractABI,
    functionName: 'getDefaultBondPeriod',
  });

  useEffect(() => {
    if (data) {
      const bondPeriodInSeconds = Number(data);
      setSeconds(bondPeriodInSeconds.toString());
      setDays((bondPeriodInSeconds / (24 * 60 * 60)).toFixed(2));
    } else if (!data && error) {
      setError('Failed to fetch bond period from the contract.');
    }
  }, [data, error]);

  return (
    <div className="flex flex-col items-center mt-1">
      {/* Display Bond Period */}
      {isLoading ? (
        <p>Loading bond period...</p>
      ) : seconds && days ? (
        <div className="text-center">
          <div className="px-6 py-3 bg-amber-100 text-black-800 text-1xl font-extrabold rounded-md mt-1">
            <span >Bond Period: </span>{' '}
            <span >Seconds: {seconds}</span>{' '}
            <span >Days: {days}</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : null}
    </div>
  );
};

export default GetBondPeriod;

