import React from 'react';

export default function TokensText() {
  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
      {/* Header */}
      <h2
        className="text-3xl md:text-4xl font-normal leading-tight"
        style={{ color: '#230b59' }}
      >
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Balances for 
        </span>{' '}
        <span
          className="text-4xl md:text-5xl leading-none italic tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          your
        </span>{' '}
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          MRAY Assets
        </span>
      </h2>
      <br />

      <p>
        <b>Collateralized Liquidity</b>
      </p>
      <p className="mt-4 text-base">
        All Treasury assets are locked creating stability and certainty.
      </p>
      <br />

      <div className="flex justify-center mt-8">
        <p
          className="text-2xl md:text-3xl leading-snug text-center"
          style={{
            fontFamily: "'Libre Baskerville', serif",
            color: '#230b59',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 40px',
          }}
        >
          {'"MRAY tokens are '}
          <b>fully backed by USDC reserves</b>
          {' and bonded NFTs."'}
        </p>
      </div>
    </div>
  );
}
