import React from 'react';

const DisplayLockedMsg: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-auto h-auto bg-red-100 text-red-700 p-2 rounded-md shadow-md">
      <p className="text-center font-semibold">NFT Bonded</p>
    </div>
  );
};

export default DisplayLockedMsg;
