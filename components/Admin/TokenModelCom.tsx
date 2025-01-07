"use client";

import Navbar from "@/components/Navbar/Navbar";
import FlowDiagram from "@/components/Admin/FlowDiagram";
import GetWalletHeader from "@/components/Util/GetWalletHeader"; // Import the new header

export default function NftAdminCom() {

  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

        {/* Content Boxes Section */}
        <div className="w-full flex justify-center">
          {/* Add responsive container for the FlowDiagram */}
          <div className="w-full max-w-[800px] h-auto">
            <FlowDiagram />
          </div>
        </div>
      </main>

    </div>
  );
}

