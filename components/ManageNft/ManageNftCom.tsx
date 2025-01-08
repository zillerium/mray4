'use client';

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ManageNftIpfs from '@/components/ManageNft/ManageNftIpfs';
import NftGraphicCom from '@/components/Nft/NftGraphicCom';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

const ManageNftCom: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <ManageNftIpfs />
          <NftGraphicCom />
        </div>
      </main>
    </div>
  );
};

export default ManageNftCom;
