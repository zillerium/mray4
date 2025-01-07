import React from 'react';

const NftGraphicCom = () => {
  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md flex justify-center items-center">

      <img
        src="/carnft1.svg"
        alt="NFTs"
        className="max-w-full h-auto" // Ensures image scales responsively
        style={{ width: '100%', maxWidth: '500px' }} // Caps width for larger screens
      />
    </div>
  );
};

export default NftGraphicCom;

