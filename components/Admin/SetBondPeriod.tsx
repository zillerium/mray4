import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import bondTreasuryContractABI from '@/lib/bondTreasuryABI.json'; // ABI for the bond contract
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json'; // Address for the bond contract
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Utility for showing transaction hash

const contractAddress = bondTreasuryContractAddress.address as `0x${string}`;

const SetBondPeriod: React.FC = () => {
  const [bondPeriod, setBondPeriod] = useState<string>(''); // State for bond period input
  const [timeUnit, setTimeUnit] = useState<'seconds' | 'hours' | 'days'>('seconds'); // Radio button selection
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const calculateBondPeriodInSeconds = (): number => {
    const input = parseFloat(bondPeriod);
    if (isNaN(input) || input <= 0) return 0;

    switch (timeUnit) {
      case 'hours':
        return input * 60 * 60; // Convert hours to seconds
      case 'days':
        return input * 24 * 60 * 60; // Convert days to seconds
      default:
        return input; // Seconds
    }
  };

  const handleSetBondPeriod = async () => {
    const bondPeriodInSeconds = calculateBondPeriodInSeconds();

    if (bondPeriodInSeconds <= 0) {
      alert('Please enter a valid bond period greater than zero.');
      return;
    }

    try {
      writeContract({
        address: contractAddress,
        abi: bondTreasuryContractABI,
        functionName: 'setDefaultBondPeriod',
        args: [bondPeriodInSeconds], // Pass bond period in seconds
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {/* Input for bond period */}

      {/* Radio Buttons for Time Unit */}
      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="timeUnit"
            value="seconds"
            checked={timeUnit === 'seconds'}
            onChange={() => setTimeUnit('seconds')}
            className="w-5 h-5 text-blue-500 bg-gray-200 border-gray-300 rounded-full focus:ring-blue-500"
          />
          <span className="text-lg font-medium">Seconds</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="timeUnit"
            value="hours"
            checked={timeUnit === 'hours'}
            onChange={() => setTimeUnit('hours')}
            className="w-5 h-5 text-blue-500 bg-gray-200 border-gray-300 rounded-full focus:ring-blue-500"
          />
          <span className="text-lg font-medium">Hours</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="timeUnit"
            value="days"
            checked={timeUnit === 'days'}
            onChange={() => setTimeUnit('days')}
            className="w-5 h-5 text-blue-500 bg-gray-200 border-gray-300 rounded-full focus:ring-blue-500"
          />
          <span className="text-lg font-medium">Days</span>
        </label>
      </div>
      <div className="flex flex-col items-start space-y-2 w-full max-w-md">
        <label className="text-gray-700">Set Bond Period:</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter bond period"
          value={bondPeriod}
          onChange={(e) => setBondPeriod(e.target.value)} // Update bond period
        />
      </div>

      {/* Submit Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-md"
        onClick={handleSetBondPeriod}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Set Bond Period
      </button>

      {/* Show Transaction Status or Errors */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default SetBondPeriod;

