import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import NftWalletAddressComponentPage from '@/components/Nft/NftWalletAddressComponentPage';
import LoadImageIpfsCid from '@/components/Ipfs/LoadImageIpfsCid';
import CreateNftAndIpfs from '@/components/Ipfs/CreateNftAndIpfs';
import CopyText from '@/components/Util/CopyText';
import CheckMintingUser from '@/components/Util/CheckMintingUser';

export default function NftMintIpfs() {
  const { address: userAddress } = useAccount();

  const [signed, setSigned] = useState<boolean>(false);
  const [imageClientName, setImageClientName] = useState<string>('');
  const [ipfsImageCid, setIpfsImageCid] = useState<string>('');
  const [nftWalletAddress, setNftWalletAddress] = useState<string | undefined>(
    userAddress,
  );
  const [isMintingUser, setIsMintingUser] = useState<boolean | null>(null);

  useEffect(() => {
    setSigned(!!userAddress);
    setNftWalletAddress(userAddress);
  }, [userAddress]);

  const handleImageClientNameChange = (name: string) => {
    setImageClientName(name);
  };

  const handleIpfsCidChange = (cid: string) => {
    setIpfsImageCid(cid);
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
          Mint your new NFT
        </span>
      </h2>
      <br />
      <p>
        <b>Upload your image</b>
      </p>
      <p className="mt-4 text-base">
        Our NFT minting gives you an NFT and an image registered. Upload your
        image and then mint.
      </p>
      <br />
      <div className="flex flex-col items-center">
        {userAddress ? (
          <>
            {/* Check Minting User */}
            <CheckMintingUser
              walletAddress={userAddress}
              onResult={setIsMintingUser}
            />

            {/* Conditional Rendering for Minting Users */}
            {isMintingUser === true ? (
              <>
                <div className="mt-4">
                  <NftWalletAddressComponentPage
                    nftWalletAddress={nftWalletAddress ?? ''}
                    setNftWalletAddress={setNftWalletAddress}
                  />
                </div>
                <hr className="w-full border-t border-gray-300 my-4" />
                <LoadImageIpfsCid
                  enabledButton={signed}
                  onImageClientNameChange={handleImageClientNameChange}
                  onIpfsCidChange={handleIpfsCidChange}
                />
                <div className="mt-4">
                  <div className="text-lg font-medium">{imageClientName}</div>
                  {ipfsImageCid && (
                    <div className="mt-2 p-4 bg-blue-100 rounded-lg">
                      IPFS Image CID to be minted:{' '}
                      <a
                        href={`https://rose-wonderful-crab-70.mypinata.cloud/ipfs/${ipfsImageCid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        <CopyText copiedText={ipfsImageCid} />
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <CreateNftAndIpfs
                    nftWalletAddress={nftWalletAddress!}
                    carModelUri={ipfsImageCid}
                  />
                </div>
              </>
            ) : isMintingUser === false ? (
              <p className="text-red-500 mt-4">Only Admins can mint NFTs.</p>
            ) : (
              <p></p>
            )}
          </>
        ) : (
          <div>Please connect your wallet to proceed.</div>
        )}
      </div>
    </div>
  );
}
