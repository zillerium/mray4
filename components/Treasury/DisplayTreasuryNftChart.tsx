import React from 'react';

interface DisplayTreasuryNftChartProps {
  poolData: [number, number][]; // Array of tuples with [ethAmount, nftValue]
}

const DisplayTreasuryNftChart: React.FC<DisplayTreasuryNftChartProps> = ({ poolData }) => {
  const totalUSD = poolData.reduce((acc, [usdAmount]) => acc + usdAmount, 0);
  const radius = 80;
  const diameter = 2 * Math.PI * radius;
  let offset = 0;

  // Formatter for USD amounts without decimals
  const formatUSD = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="flex w-full h-auto items-center justify-center space-x-8">
      {/* Donut Chart */}
      <svg width="50%" height="50%" viewBox="0 0 220 220">
        {poolData.map(([ethAmount], index) => {
          const segmentLength = (ethAmount / totalUSD) * diameter;
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
        {poolData.map(([ethAmount, nftValue], index) => (
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
              {nftValue} ({formatUSD(ethAmount)} USD)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTreasuryNftChart;
