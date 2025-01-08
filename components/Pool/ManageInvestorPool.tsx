import React, { useState } from 'react';
import ReadInvestorPool from '@/components/Pool/ReadInvestorPool';
import ReadInvestorPoolData from '@/components/Pool/ReadInvestorPoolData';

export default function ManageInvestorPool() {
  const [investorList, setInvestorList] = useState<string[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<string | null>(null);

  const handleInvestorListUpdate = (newInvestorList: string[]) => {
    setInvestorList(newInvestorList);
  };

  const handleSelectInvestor = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedInvestor(event.target.value);
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
          Mray&apos;s Investor Vault
        </span>
      </h2>
      <br />
      <p>
        <b>Mray&apos;s Pool of Locked USDCs</b>
      </p>
      <p className="mt-4 text-base">
        Our investors provides liquid USDC to help stablise the MRAY stablecoin.
      </p>
      <br />

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <ReadInvestorPool onInvestorListUpdate={handleInvestorListUpdate} />
        <div className="w-48">
          {/* Dropdown to Display Wallet Addresses */}
          <select
            id="investorDropdown"
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded"
            onChange={handleSelectInvestor}
            value={selectedInvestor ?? ''}
          >
            <option value="" disabled>
              Select Wallet
            </option>
            {investorList.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center flex-wrap items-center">
        {selectedInvestor !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <h2>Selected Wallet: {selectedInvestor}</h2>
            <ReadInvestorPoolData walletAddress={selectedInvestor} />
          </div>
        )}
      </div>
    </div>
  );
}
