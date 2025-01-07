import React from 'react';
import SVGSquareStablecoin from '@/components/Stablecoin/SVGSquareStablecoin'; // Import the SVG component

const ShowStableCoinImageBalance = () => {
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
          Your Assets
        </span>
      </h2>
      <br />
      {/* Donut Chart */}
      <div className="mt-6">
        <SVGSquareStablecoin />
      </div>
    </div>
  );
};

export default ShowStableCoinImageBalance;

