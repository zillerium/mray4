import React from 'react';

const HomePageSummary = () => (
  <div className="flex flex-col items-center text-center my-12">
    {/* Title */}
    <h2
      className="text-3xl md:text-4xl font-normal leading-tight mb-6"
      style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
    >
      Ready for new liquidity for your RWAs?
    </h2>

    {/* Stats Row */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-800">
      <div className="flex items-baseline">
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight mr-1"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          $3M+
        </span>
        <span className="text-base">NFTs</span>
      </div>

      {/* Vertical divider line for separation */}
      <div className="hidden md:block h-10 border-l border-gray-400 mx-4" />

      <div className="flex items-baseline">
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight mr-1"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          $3M+
        </span>
        <span className="text-base">Issued</span>
      </div>

      <div className="hidden md:block h-10 border-l border-gray-400 mx-4" />

      <div className="flex items-baseline">
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight mr-1"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          20+
        </span>
        <span className="text-base">Valuations</span>
      </div>
    </div>
  </div>
);

export default HomePageSummary;
