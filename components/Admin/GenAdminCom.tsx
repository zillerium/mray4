'use client';

import Navbar from '@/components/Navbar/Navbar';
import GetWalletHeader from '@/components/Util/GetWalletHeader'; // Import the new header

export default function GenAdminCom() {
  return (
    <div>
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        <GetWalletHeader />

        {/* Content Boxes Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full mt-8">
          <h2
            className="text-3xl md:text-4xl font-normal leading-tight"
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
              Project Admin 
            </span>
          </h2>
        </div>
        <div>
          <p className="mt-4 text-base">
            This is an admin screen for the project. It has restricted access.
          </p>
        </div>

        <div>
        </div>
      </main>
    </div>
  );
}
