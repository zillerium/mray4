'use client';

import Navbar from '@/components/Navbar/Navbar';
import HomePageDesc from './HomePageDesc';
import HomePageImage from './HomePageImage';
import HomeCarCapital from './HomeCarCapital';
import HomePageSummary from './HomePageSummary';
import HomePageNFTDesc from './HomePageNFTDesc';
import HomePromoMsg from './HomePromoMsg';
import HomePageNFTImage from './HomePageNFTImage';
import GetWalletHeader from '@/components/Util/GetWalletHeader';

export default function HomePageCom() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />
        {/* Content Boxes Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <HomePageDesc />
          <HomePageImage />
        </div>

        {/* New Section for NFT Description and Image */}
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <HomePageNFTDesc />
          <HomePageNFTImage />
        </div>

        {/* HomeCarCapital and HomePageSummary Components */}
        <HomePromoMsg />
        <HomeCarCapital />
        <HomePageSummary />
      </main>
    </div>
  );
}
