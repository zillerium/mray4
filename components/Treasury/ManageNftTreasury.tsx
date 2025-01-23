import React, { useState } from 'react';
import ReadNftsPool from '@/components/ReadNft/ReadNftsPool';
import ReadNftPoolData from '@/components/ReadNft/ReadNftPoolData';
import DisplayNFTNumber from '@/components/Nft/DisplayNFTNumber';
import RedeemNft from '@/components/Bond/RedeemNft';
import BuyNft from '@/components/Bond/BuyNft';
import GetMrayTokenBalance from '@/components/Tokens/GetMrayTokenBalance';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

export default function ManageNftTreasury() {
  const [nftList, setNftList] = useState<number[]>([]);
  const [selectedNft, setSelectedNft] = useState<number | null>(null);

  const handleNftListUpdate = (newNftList: number[]) => {
    setNftList(newNftList);
  };

  const handleSelectNft = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedNft(selectedValue);
  };

  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
      <h2
              className="flex items-center space-x-4 text-3xl md:text-4xl font-normal leading-tight"

        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
      >
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          NFT Treasury # 
        </span>
        {selectedNft !== null && (
          <DisplayNFTNumber selectedToken={selectedNft} />
        )}
      </h2>
      <br />
      <p>
        <b>Bonded NFTs</b>
      </p>
      <p className="mt-4 text-base">
       Bonded NFTs have minted MRAY tokens and USDC reserves
        for RWAs.
      </p>
      <div className="w-full h-px bg-gray-300 mb-2"></div>


      <div className="flex flex-wrap items-center gap-4 mt-4">
        <ReadNftsPool onNftListUpdate={handleNftListUpdate} />

        <div className="w-48">
          <select
            id="nftDropdown"
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded"
            onChange={handleSelectNft}
            value={selectedNft ?? ''}
          >
            <option value="" disabled>
              -- Select NFT --
            </option>
            {nftList.map((nftId) => (
              <option key={nftId} value={nftId}>
                NFT #{nftId}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center flex-wrap items-center">
        {selectedNft !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <h2>Selected NFT is {selectedNft}</h2>
            <ReadNftPoolData nftId={selectedNft} />
          </div>
        )}
      </div>

      <div className="flex justify-center flex-wrap items-center">
        {selectedNft !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <RedeemNft nftId={selectedNft.toString()} />
          </div>
        )}

        {selectedNft !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <BuyNft nftId={selectedNft.toString()} />
          </div>
        )}
      </div>
    </div>
  );
}
