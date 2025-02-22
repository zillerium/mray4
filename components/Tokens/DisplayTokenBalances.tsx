import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { useAccount } from 'wagmi';
import GetMrayTokenBalance from '@/components/Tokens/GetMrayTokenBalance';
import GetVeMrayBalance from '@/components/Tokens/GetVeMrayBalance';
import GetWalletUsdcTreasuryBalance from '@/components/Tokens/GetWalletUsdcTreasuryBalance';

const DisplayTokenBalances = () => {
  const { isConnected, address } = useAccount();

  return (
    <div
      className="bg-white"
      style={{
        boxShadow: `
          6px 6px 0px #3b2b7d, /* Sharp edge shadow */
          6px 6px 12px rgba(0, 0, 0, 0.1) /* Soft outer blur */
        `,
        padding: '20px',
        borderRadius: '60px', // Increased border-radius for rounded corners
        backgroundColor: '#ffffff',
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          rx="30" /* Increased rounded corners */
          ry="30"
          fill="none" /* Transparent SVG background */
        />

        {/* Content Rows */}
        <foreignObject x="10" y="20" width="180" height="140">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px', // Reduced font size
              fontWeight: 'bold',
              color: '#230b59',
              height: '100%',
            }}
          >
            {/* Row 1: MRAY Balance */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Mray Tokens</span>
              <span style={{ color: '#4f46e5' }}>
                {isConnected && address ? (
                  <GetMrayTokenBalance walletAddress={address} />
                ) : (
                  <span>0</span>
                )}
              </span>
            </div>

            {/* Row 2: veMray Balance */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '6px', // Balanced spacing
              }}
            >
              <span>VeMray Tokens</span>
              <span style={{ color: '#4f46e5' }}>
                {isConnected ? <GetVeMrayBalance /> : <span>0</span>}
              </span>
            </div>

            {/* Row 3: USDC Stablecoin Locked Balance */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '6px', // Balanced spacing
              }}
            >
              <span>Treasury USDC</span>
              <span style={{ color: '#4f46e5' }}>
                {isConnected && address ? (
                  <GetWalletUsdcTreasuryBalance walletAddress={address} />
                ) : (
                  <span>0</span>
                )}
              </span>
            </div>
          </div>
        </foreignObject>

        {/* Wallet Icon (Adjusted Position with Bigger Size) */}
        <foreignObject x="50" y="110" width="100" height="40">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon
              icon={faCoins}
              style={{ fontSize: '36px', color: '#4f46e5' }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default DisplayTokenBalances;
