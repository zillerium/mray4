import React, { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json'; // ABI for NftVault contract
import vaultNFTAddress from '@/lib/vaultNFTAddress.json'; // Contract address for NftVault
import CopyText from '@/components/Util/CopyText';
import { CURRENCY_FACTOR } from "@/components/Util/ReformatCurrency";

interface ReadNftPoolDataProps {
  nftId: number;
}

const contractAddress = vaultNFTAddress.address as `0x${string}`;

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const ReadNftPoolData: React.FC<ReadNftPoolDataProps> = ({ nftId }) => {
  const [vaultData, setVaultData] = useState<{
    originalOwner: string;
    lockedValue: string;
    collateralizationRatio: string;
    userShare: string;
    contractShare: string;
    lockedUntil: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch the metadata for the specified NFT ID
  const { data: nftDetailsData, error: nftDetailsError } = useContractRead({
    address: contractAddress,
    abi: vaultNFTABI,
    functionName: 'getLockedNFTDetails',
    args: [nftId],
  });

  // Update the vault data or error state based on the result
  useEffect(() => {
    if (nftDetailsData) {
      const {
        originalOwner,
        lockedValue,
        lockedUntil,
        collateralizationRatio,
      } = nftDetailsData as {
        originalOwner: string;
        lockedValue: string;
        collateralizationRatio: string;
        lockedUntil: string;
      };

      const lockedValueNum = Number(lockedValue) / CURRENCY_FACTOR;
      const cr = Number(collateralizationRatio) / 100; // Convert percentage to decimal
      const userShare = lockedValueNum * cr;
      const contractShare = lockedValueNum - userShare;

      setVaultData({
        originalOwner,
        lockedValue: formatNumber(lockedValueNum), // Apply formatting
        collateralizationRatio: `${collateralizationRatio}%`,
        userShare: formatNumber(userShare), // Apply formatting
        contractShare: formatNumber(contractShare), // Apply formatting
        lockedUntil: new Date(Number(lockedUntil) * 1000).toLocaleString(), // Convert timestamp to date
      });
      setError(null);
    } else if (nftDetailsError) {
      setError('Error fetching NFT data');
    }
  }, [nftDetailsData, nftDetailsError]);

  return (
    <div className="flex flex-col items-center space-y-4 mt-4">
      {vaultData ? (
        <table className="table-auto w-full max-w-md bg-white border rounded-lg shadow-lg mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Owner</td>
              <td className="border px-4 py-2">
                <CopyText copiedText={vaultData.originalOwner} />
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Locked Value (USD)</td>
              <td className="border px-4 py-2">{vaultData.lockedValue}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Collateralization Ratio</td>
              <td className="border px-4 py-2">{vaultData.collateralizationRatio}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Original Minted Amount</td>
              <td className="border px-4 py-2">{vaultData.userShare}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Original Locked Amount</td>
              <td className="border px-4 py-2">{vaultData.contractShare}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Locked Until</td>
              <td className="border px-4 py-2">{vaultData.lockedUntil}</td>
            </tr>
          </tbody>
        </table>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <p>Loading NFT data...</p>
      )}
    </div>
  );
};

export default ReadNftPoolData;

