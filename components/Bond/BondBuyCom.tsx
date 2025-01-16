import React, { useState } from 'react';
import { FaSync } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import BuyBondDetails from '@/components/Bond/BuyBondDetails';
import DisplayLockedMsg from '@/components/Util/DisplayLockedMsg';
import VeVotesCastBal from '@/components/VeVotes/VeVotesCastBal';
import TokenHolderVeVoting from '@/components/VeVotes/TokenHolderVeVoting';
import ReadAllNfts from '@/components/ReadNft/ReadAllNfts';
import DisplayNftsDropDown from '@/components/Nft/DisplayNftsDropDown';
import ReadNftByTokenNumberOwner from '@/components/ReadNft/ReadNftByTokenNumberOwner';
import DisplayIpfsDocs from '@/components/Ipfs/DisplayIpfsDocs';
import DisplayNFTNumber from '@/components/Nft/DisplayNFTNumber';
import Navbar from '@/components/Navbar/Navbar';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

export default function BondBuyCom() {
  const { isConnected } = useAccount();
  const [tokenList, setTokenList] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [votingActive, setVotingActive] = useState<boolean>(false); // New state
  const [nftOwner, setNftOwner] = useState<string | null>(null);
  const [nftLockedStatus, setNftLockedStatus] = useState<boolean | null>(null);

  const handleTokenListUpdate = (newTokenList: number[]) => {
    setTokenList(newTokenList);
  };

  const handleSelectToken = (tokenId: number) => {
    setSelectedToken(tokenId);
  };

  const handleVotingStateChange = (active: boolean) => {
    setVotingActive(active); // Update voting state based on child
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
            <h2
              className="flex items-center space-x-4 text-3xl md:text-4xl font-normal leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#230b59',
              }}
            >
              <span
                className="text-4xl md:text-5xl font-black leading-none tracking-tight"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#230b59',
                }}
              >
                Buy an NFT Bond # 
              </span>
              {selectedToken !== null && (
                <DisplayNFTNumber selectedToken={selectedToken} />
              )}
            </h2>
            <br />
            <b>Purchasing USDCs are Treasury Locked</b>
            <p className="mt-4 text-base">
             Purchasing a bond will lock the USDCs into the Treasury and ERC20 MRAY tokens are issued. The USDC is never spent.

            </p>
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
                {isLoaded && (
                  <ReadAllNfts onTokenListUpdate={handleTokenListUpdate} />
                )}
                {tokenList.length > 0 && (
                  <DisplayNftsDropDown
                    tokenList={tokenList}
                    onSelectToken={handleSelectToken}
                  />
                )}
              </div>
            </div>

            {selectedToken !== null && isConnected && (
              <>
                {!nftLockedStatus && (
                  <BuyBondDetails
                    nftId={selectedToken}
                    onVotingStateChange={handleVotingStateChange} // Pass state change handler
                  />
                )}
                {votingActive && !nftLockedStatus && (
                  <div>
                    <TokenHolderVeVoting nftId={selectedToken} />
                  </div>
                )}
                {nftLockedStatus && <DisplayLockedMsg />}
              </>
            )}
          </div>

          {/* NFT Details Section */}
          {selectedToken !== null && (
            <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
              <ReadNftByTokenNumberOwner
                tokenNumber={selectedToken.toString()}
                onOwnerFetched={setNftOwner} // New callback
                onNftLockedStatus={(lockedStatus) =>
                  setNftLockedStatus(lockedStatus ?? false)
                } // Map null to false
              />
              <div className="mt-4">
                <h2 className="font-semibold mb-2">Docs</h2>
                <DisplayIpfsDocs tokenNumber={selectedToken.toString()} />
              </div>
            </div>
          )}
        </div>

        <hr className="w-full border-t border-gray-300 my-6" />
        <div className="w-full">
          {/* NFT Voting and Details */}
          {selectedToken !== null && isConnected && nftOwner !== null && (
            <>
              <VeVotesCastBal
                nftOwner={nftOwner}
                nftId={selectedToken}
                onVotesCastChange={() => {}}
              />
            </>
          )}
        </div>
        <hr className="w-full border-t border-gray-300 my-6" />
      </main>
    </div>
  );
}
