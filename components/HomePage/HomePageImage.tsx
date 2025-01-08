import React, { useEffect, useState } from 'react';

const HomePageImage = () => {
  const [lamboCounter, setLamboCounter] = useState(1);
  const [ferrariCounter, setFerrariCounter] = useState(1);
  const [mclarenCounter, setMcLarenCounter] = useState(1);
  const [totalCounter, setTotalCounter] = useState(1);

  useEffect(() => {
    // Increment counters towards target values
    const lamboInterval = setInterval(() => {
      setLamboCounter((prev) => (prev < 209000 ? prev + 2000 : 209000));
    }, 20);

    const ferrariInterval = setInterval(() => {
      setFerrariCounter((prev) => (prev < 134000 ? prev + 2000 : 134000));
    }, 20);

    const mclarenInterval = setInterval(() => {
      setMcLarenCounter((prev) => (prev < 88000 ? prev + 1000 : 88000));
    }, 20);

    const totalInterval = setInterval(() => {
      setTotalCounter((prev) => (prev < 431000 ? prev + 3000 : 431000));
    }, 20);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(lamboInterval);
      clearInterval(ferrariInterval);
      clearInterval(mclarenInterval);
      clearInterval(totalInterval);
    };
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

        {/* Total Liquidity Counter */}
        <text
          x="125"
          y="80"
          textAnchor="middle"
          fontSize="18"
          fill="#230b59"
          fontWeight="bold"
        >
          Total Liquidity
        </text>
        <text
          x="125"
          y="110"
          textAnchor="middle"
          fontSize="24"
          fill="#230b59"
          fontWeight="bold"
        >
          ${totalCounter.toLocaleString()} USD
        </text>

        {/* Lamborghini Counter */}
        <text x="50" y="220" fontSize="12" fill="#230b59" fontWeight="bold">
          Lamborghini
        </text>
        <text
          x="190"
          y="220"
          textAnchor="end"
          fontSize="12"
          fill="#230b59"
          fontWeight="bold"
        >
          ${lamboCounter.toLocaleString()}
        </text>

        {/* Ferrari Counter */}
        <text x="50" y="270" fontSize="12" fill="#230b59" fontWeight="bold">
          Ferrari
        </text>
        <text
          x="190"
          y="270"
          textAnchor="end"
          fontSize="12"
          fill="#230b59"
          fontWeight="bold"
        >
          ${ferrariCounter.toLocaleString()}
        </text>

        {/* McLaren Counter */}
        <text x="50" y="320" fontSize="12" fill="#230b59" fontWeight="bold">
          McLaren
        </text>
        <text
          x="190"
          y="320"
          textAnchor="end"
          fontSize="12"
          fill="#230b59"
          fontWeight="bold"
        >
          ${mclarenCounter.toLocaleString()}
        </text>
      </svg>
    </div>
  );
};

export default HomePageImage;
