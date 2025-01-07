import React, { useState } from 'react';
import ReadNftsPool from '@/components/ReadNft/ReadNftsPool';
import ReadNftPoolData from '@/components/ReadNft/ReadNftPoolData';
import DisplayNFTNumber from '@/components/Nft/DisplayNFTNumber';
import RedeemNftPool from '@/components/Pool/RedeemNftPool';
import BuyNftPool from '@/components/Pool/BuyNftPool';
import GetStablecoinBalanceNew from '@/components/Stablecoin/GetStablecoinBalanceNew';
import vaultNFTAddress from "@/lib/vaultNFTAddress.json"; // Address for the vault contract

const contractAddress = vaultNFTAddress.address as `0x${string}`;

export default function ManagePool() {

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
        className="text-3xl md:text-4xl font-normal leading-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
      >
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          Mray&apos;s NFT Vault
        </span>
        {selectedNft !== null && <DisplayNFTNumber selectedToken={selectedNft} />}
      </h2>
      <br />
      <p>
        <b>Mray&apos;s Pool of Locked NFTs</b>
      </p>
      <p className="mt-4 text-base">
        Our NFT pool has locked a range of NFTs which act as a safe asset base for RWAs.
      </p>
  <div className="w-full h-px bg-gray-300 mb-2"></div>

{/* Total Locked Mray Tokens */}
<div className="mt-2">
  {/* Line above and below */}
  <div className="border-t border-b py-4">
    <div className="flex items-center justify-between">
      <p className="font-bold text-2xl text-purple-900">
        Locked Assets (Mray) 
      </p>
      <div className="px-6 py-3 bg-green-100 text-green-800 text-3xl font-extrabold rounded-md">
        <GetStablecoinBalanceNew walletAddress={contractAddress} />
      </div>
    </div>
  </div>
</div>
  <div className="w-full h-px bg-gray-300 mb-2"></div>


      <div className="flex flex-wrap items-center gap-4 mt-4">
        <ReadNftsPool onNftListUpdate={handleNftListUpdate} />

        <div className="w-48">
          {/* Dropdown to Display Locked NFTs */}
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
        {/* Display Selected NFT ID */}
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
            <RedeemNftPool nftId={selectedNft.toString()} />
          </div>
        )}

        {selectedNft !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <BuyNftPool nftId={selectedNft.toString()} />
          </div>
        )}
      </div>
    </div>
  );
}

