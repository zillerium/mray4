import React from 'react';

export default function ShowStablecoinBal() {
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
          Enjoy
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
          mRay Assets in your wallet
        </span>
      </h2>
      <br />

      {/* ERC20 Car Token */}
      <p>
        <b>ERC20 Car Token</b>
      </p>
      <p className="mt-4 text-base">
        Once your tokens are minted, they are in your wallet to spend and use as
        you like, 24/7. You can redeem your NFT any time before expiration.
      </p>
      <br />

      {/* Large Text Section */}
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
          {'"Liquidity via Mray is clean and simple, illiquid NFTs can be '}
          <b>instantly transformed into liquid</b>
          {' ERC20 tokens, straight into your wallet."'}
        </p>
      </div>
    </div>
  );
}
