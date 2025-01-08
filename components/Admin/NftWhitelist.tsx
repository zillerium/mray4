import React, { useState } from 'react';
import { useContractRead } from 'wagmi';
import uniContractABI from '@/lib/uniContractABI.json'; // Contract ABI for UnifiedNFT
import uniContractAddress from '@/lib/uniContractAddress.json'; // Contract address for UnifiedNFT
import { FaSync } from 'react-icons/fa';
import NftAddAdminWallet from '@/components/Admin/NftAddAdminWallet';
import NftAdminWalletRemove from '@/components/Admin/NftAdminWalletRemove';
import AdminWalletTimeline from '@/components/Admin/AdminWalletTimeline';

const NftWhitelist: React.FC = () => {
  const [adminWallets, setAdminWallets] = useState<string[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const { data, refetch } = useContractRead({
    address: uniContractAddress.address as `0x${string}`,
    abi: uniContractABI,
    functionName: 'showAdminWallets',
  });

  const handleRefresh = () => {
    if (data) {
      setAdminWallets(data as string[]);
    }
    refetch();
  };

  const handleSelectWallet = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  return (
    <div className="p-6">
      <NftAddAdminWallet />
      <br />
      <button
        onClick={handleRefresh}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded flex items-center hover:bg-blue-600 transition"
      >
        <FaSync className="mr-2" />
        List All Admin Wallets
      </button>

      {/* Timeline Container */}
      <div className="space-y-8 relative mt-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {adminWallets.length > 0 ? (
          adminWallets.map((wallet, index) => (
            <AdminWalletTimeline
              key={index}
              walletAddress={wallet}
              onClick={() => handleSelectWallet(wallet)}
            />
          ))
        ) : (
          <p className="text-gray-500">Click refresh for the admin wallets.</p>
        )}
      </div>

      {selectedWallet && (
        <NftAdminWalletRemove walletAddress={selectedWallet} />
      )}
    </div>
  );
};

export default NftWhitelist;
