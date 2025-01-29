import React, { useState } from 'react';
import ReadBondPool from '@/components/Bond/ReadBondPool';
import RedeemBond from '@/components/Bond/RedeemBond';
import ReadBondPoolData from '@/components/Bond/ReadBondPoolData';
import DisplayBondNumber from '@/components/Bond/DisplayBondNumber';
import NavigationBox from '@/components/Explore/NavigationBox';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for the vault contract

const contractAddress = bondTreasuryAddress.address as `0x${string}`;

export default function ManageBondTreasury() {
  const [bondList, setBondList] = useState<number[]>([]);
  const [selectedBond, setSelectedBond] = useState<number | null>(null);

  const handleBondListUpdate = (newBondList: number[]) => {
    setBondList(newBondList);
  };

  const handleSelectBond = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedBond(selectedValue);
  };

  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md">
      <h2
        className="flex items-center space-x-4 text-3xl md:text-4xl font-normal leading-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: '#230b59' }}
      >
        <span
          className="text-4xl md:text-5xl font-black leading-none tracking-tight"
          style={{ fontFamily: "'Montserrat', sans-serif", color: '#230b59' }}
        >
          Bond Treasury #
        </span>
        {selectedBond !== null && (
          <DisplayBondNumber selectedToken={selectedBond} />
        )}
      </h2>
      <br />
      <p>
        <b>Bonds</b>
      </p>
      <p className="mt-4 text-base">Bonds which were sold.</p>
      <div className="w-full h-px bg-gray-300 mb-2"></div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <ReadBondPool onBondListUpdate={handleBondListUpdate} />

        <div className="w-48">
          <select
            id="bondDropdown"
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded"
            onChange={handleSelectBond}
            value={selectedBond ?? ''}
          >
            <option value="" disabled>
              -- Select Bond --
            </option>
            {bondList.map((bondId) => (
              <option key={bondId} value={bondId}>
                Bond #{bondId}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center flex-wrap items-center">
        {selectedBond !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <h2>Bond is {selectedBond}</h2>
          </div>
        )}
      </div>

      <div className="flex justify-center flex-wrap items-center">
        {selectedBond !== null && (
          <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
            <ReadBondPoolData bondId={selectedBond} />
          </div>
        )}
      </div>

      <div className="flex justify-center flex-wrap items-center flex-col">
        {selectedBond !== null && (
          <>
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
              {/* Convert selectedBond to a string */}
              <RedeemBond bondId={selectedBond.toString()} />
            </div>
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg mt-4">
              <div className="w-full px-4 py-2 text-center text-white rounded-lg ">
                <NavigationBox href="/BondedNft" title="Check NFT" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
