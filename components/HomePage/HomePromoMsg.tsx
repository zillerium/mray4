'use client';

export default function HomePromoMsg() {
  return (
    <div className="w-full flex flex-col items-center mt-8 bg-gray-50 py-12 leading-tight">
      {/* Header Message */}
      <h2
      className="text-3xl md:text-8xl font-normal leading-tight"

      style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
      >
        Donn&apos;t just take our word for it ...
    </h2>

      <div className="bg-blue-100 rounded-lg shadow-md px-6 py-8 w-full max-w-6xl text-center mt-12">

      {/* Blue Box with Message */}
        {/* Quote Icon */}
  <h2
      className="text-4xl md:text-5xl font-black leading-none tracking-tight"
      style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
    >
           &ldquo;
    </h2>
        {/* Promo Message */}
  <h2
      className="text-4xl md:text-6xl font-black leading-none tracking-tight"
      style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
    >
          NFT Liquidity has never been easier.
    </h2>
        {/* Citation */}
        <div
          className="text-center text-xl text-gray-700 mt-4"
      style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          John Jones (NFT Owner)
        </div>
        <div
          className="text-center text-xl text-gray-700 mt-4"
      style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          2025
        </div>
      </div>
    </div>
  );
}

