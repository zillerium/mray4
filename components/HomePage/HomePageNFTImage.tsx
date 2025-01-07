import React, { useEffect, useState } from 'react';

const HomePageNFTImage = () => {
  const [nftValue, setNftValue] = useState(1);

  useEffect(() => {
    // Increment the counter up to $209,000
    const interval = setInterval(() => {
      setNftValue((prev) => (prev < 209000 ? prev + 2000 : 209000));
    }, 20);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md flex justify-center items-center">
      {/* Mobile phone SVG */}
      <svg
        width="250" // Fixed width for stability
        height="500" // Fixed height for the phone
        viewBox="0 0 250 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Phone body */}
        <rect
          x="10"
          y="10"
          width="230"
          height="480"
          rx="30" /* Rounded corners */
          ry="30"
          fill="#f3f4f6"
          stroke="#a0c4ff" /* Light blue border */
          strokeWidth="2"
        />
        
        {/* Screen area */}
        <rect
          x="30"
          y="30"
          width="190"
          height="440"
          rx="15"
          ry="15"
          fill="#ffffff"
        />

        {/* Liquidity Label */}
        <text x="125" y="100" textAnchor="middle" fontSize="18" fill="#230b59" fontWeight="bold">
          Liquidity
        </text>

        {/* NFT Value Counter */}
        <text x="125" y="140" textAnchor="middle" fontSize="24" fill="#230b59" fontWeight="bold">
          ${nftValue.toLocaleString()}
        </text>

        {/* NFT Details, moved further down the phone screen */}
        <text x="125" y="300" textAnchor="middle" fontSize="16" fill="#230b59" fontWeight="bold">
          2023 Lamborghini
        </text>
        <text x="125" y="330" textAnchor="middle" fontSize="14" fill="#230b59">
          Urus 4.0 [No Trim]
        </text>
        <text x="125" y="360" textAnchor="middle" fontSize="14" fill="#230b59">
          Locked for 60 days
        </text>
      </svg>
    </div>
  );
};

export default HomePageNFTImage;

