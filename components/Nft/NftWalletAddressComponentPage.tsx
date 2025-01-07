import React, { ChangeEvent } from 'react';

interface NftWalletAddressComponentPageProps {
  nftWalletAddress: string;
  setNftWalletAddress: (address: string) => void;
}

const NftWalletAddressComponentPage: React.FC<NftWalletAddressComponentPageProps> = ({
  nftWalletAddress,
  setNftWalletAddress,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNftWalletAddress(e.target.value);
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row items-center sm:space-x-4">
      <label htmlFor="nftWalletAddress" className="text-xl font-semibold mb-2 sm:mb-0">
        NFT Owner
      </label>
      <input
        type="text"
        id="nftWalletAddress"
        placeholder="Enter NFT Owner Wallet Address"
        value={nftWalletAddress}
        maxLength={60}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md w-full sm:max-w-lg"
      />
    </div>
  );
};

export default NftWalletAddressComponentPage;

