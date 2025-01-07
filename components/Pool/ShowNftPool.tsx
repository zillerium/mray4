// ShowNftPool.tsx
"use client";

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ManagePool from '@/components/Pool/ManagePool';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import PoolMgrGraphicCom from "@/components/Pool/PoolMgrGraphicCom";

const ShowNftPool: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <ManagePool />
          <PoolMgrGraphicCom />
        </div>
      </main>
    </div>
  );
};

export default ShowNftPool;

