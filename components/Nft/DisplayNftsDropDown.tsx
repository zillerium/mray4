// DisplayNftsDropDown.tsx

import React, { useState } from "react";

interface DisplayNftsDropDownProps {
  tokenList: number[];
  onSelectToken: (tokenId: number) => void;
}

const DisplayNftsDropDown: React.FC<DisplayNftsDropDownProps> = ({ tokenList, onSelectToken }) => {
  const [selectedToken, setSelectedToken] = useState<number | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(e.target.value);
    setSelectedToken(selectedValue);
    onSelectToken(selectedValue);
  };

  return (
    <div className="relative">
      <select
        className="block w-full bg-white border border-gray-400 rounded px-3 py-2 pr-8 shadow focus:outline-none focus:border-blue-500"
        value={selectedToken || ""}
        onChange={handleSelectChange}
      >
        <option value="" disabled>Select an NFT</option>
        {tokenList.map((tokenId, index) => (
          <option key={index} value={tokenId}>
            {tokenId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DisplayNftsDropDown;

