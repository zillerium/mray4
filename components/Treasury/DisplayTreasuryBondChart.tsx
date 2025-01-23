import React from 'react';
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency'; // Import CURRENCY_FACTOR

interface DisplayTreasuryBondChartProps {
  poolData: [number, number][]; 
}

const DisplayTreasuryBondChart: React.FC<DisplayTreasuryBondChartProps> = ({ poolData }) => {
  const totalUSD = poolData.reduce((acc, [, bondAmount]) => acc + bondAmount, 0) / CURRENCY_FACTOR; // Use CURRENCY_FACTOR
  const radius = 80;
  const diameter = 2 * Math.PI * radius;
  let offset = 0;

  const formatUSD = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

  console.log('format bond ===', poolData);

  return (
    <div className="flex w-full h-auto items-center justify-center space-x-8">
      {/* Donut Chart */}
      <svg width="50%" height="50%" viewBox="0 0 220 220">
        {poolData.map(([, bondAmount], index) => {
          const segmentLength = ((bondAmount / CURRENCY_FACTOR) / totalUSD) * diameter; // Use CURRENCY_FACTOR
          const color = `hsl(${index * 45}, 70%, 60%)`;

          // Save the current offset for this segment
          const currentOffset = offset;
          offset += segmentLength; // Update offset for the next segment

          return (
            <circle
              key={`circle-${index}`} // Explicit key prop for circle
              r={radius}
              cx={110}
              cy={110}
              fill="transparent"
              stroke={color}
              strokeWidth={40}
              strokeDasharray={`${segmentLength} ${diameter - segmentLength}`}
              strokeDashoffset={-currentOffset}
              transform="rotate(-90 110 110)"
            />
          );
        })}
      </svg>

      <div className="flex flex-col space-y-2">
        {poolData.map(([bondId, bondAmount], index) => (
          <div key={`key-${index}`} className="flex items-center space-x-2">
            {/* Color Bar */}
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: `hsl(${index * 45}, 70%, 60%)`,
              }}
            />
            <span className="text-gray-800 font-medium">
              Bond ID: {bondId}, Amount: {formatUSD(bondAmount / CURRENCY_FACTOR)} USDC {/* Use CURRENCY_FACTOR */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTreasuryBondChart;

