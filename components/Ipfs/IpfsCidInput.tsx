// components/IpfsCidInput.tsx

import React from 'react';

interface IpfsCidInputProps {
  ipfsCid: string;
  setIpfsCid: React.Dispatch<React.SetStateAction<string>>;
  handleReadByCidClick: () => void;
}

const IpfsCidInput: React.FC<IpfsCidInputProps> = ({
  ipfsCid,
  setIpfsCid,
  handleReadByCidClick,
}) => {
  return (
    <div className="mt-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="ipfsCid"
      >
        IPFS CID
      </label>
      <input
        className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="ipfsCid"
        type="text"
        placeholder="Enter IPFS CID"
        value={ipfsCid}
        onChange={(e) => setIpfsCid(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleReadByCidClick}
      >
        Read NFT
      </button>
    </div>
  );
};

export default IpfsCidInput;
