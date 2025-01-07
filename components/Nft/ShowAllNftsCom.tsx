import React, { useState } from 'react';
import { FaSync } from "react-icons/fa";
import { useAccount } from 'wagmi';
import ReadAllNfts from "@/components/ReadNft/ReadAllNfts";
import DisplayNftsDropDown from "@/components/Nft/DisplayNftsDropDown";
import ReadNftByTokenNumber from "@/components/ReadNft/ReadNftByTokenNumber";
import DisplayIpfsDocs from "@/components/Ipfs/DisplayIpfsDocs";
import DisplayNFTNumber from "@/components/Nft/DisplayNFTNumber";
import ShowAllNftsDetailsCom from "@/components/Nft/ShowAllNftsDetailsCom";
import Navbar from "@/components/Navbar/Navbar";
import GetWalletHeader from "@/components/Util/GetWalletHeader";

export default function ShowAllNftsCom() {
  const { isConnected } = useAccount();
  const [tokenList, setTokenList] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleTokenListUpdate = (newTokenList: number[]) => {
    setTokenList(newTokenList);
  };

  const handleSelectToken = (tokenId: number) => {
    setSelectedToken(tokenId);
  };

  const loadNfts = () => {
    if (!isLoaded) setIsLoaded(true);
  };

  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
       
        <GetWalletHeader /> 
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="flex items-center space-x-4 text-3xl md:text-4xl font-normal leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}>
              <span className="text-4xl md:text-5xl font-black leading-none tracking-tight" style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}>
               Add Valuation Documents  
              </span>
              {selectedToken !== null && <DisplayNFTNumber selectedToken={selectedToken} />}
            </h2>
            <br />
            <b>Upload PDFs</b>
            <p className="mt-4 text-base">Whether you have detailed appraisals, or other documents, they can be added to the NFT image. </p>
            <br />
           <div className="flex flex-wrap items-center gap-4 mt-4">
 
            {/* Load NFTs Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
              onClick={loadNfts}
            >
              <FaSync className="mr-2" /> Load NFTs
            </button>

            <div className="w-48">
              {isLoaded && <ReadAllNfts onTokenListUpdate={handleTokenListUpdate} />}
              {tokenList.length > 0 && (
                <DisplayNftsDropDown tokenList={tokenList} onSelectToken={handleSelectToken} />
              )}
            </div>
            </div>

        {selectedToken !== null && isConnected && (
          <>
            <ShowAllNftsDetailsCom selectedToken={selectedToken} />
          </>
        )}
          </div>

          {/* NFT Details Section */}
          {selectedToken !== null && (
            <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
              <ReadNftByTokenNumber tokenNumber={selectedToken.toString()} />
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Docs</h2>
                <DisplayIpfsDocs tokenNumber={selectedToken.toString()} />
              </div>
            </div>
          )}
        </div>

        </main>
    </div>
  );
}
