import React from 'react';

const VeMrayInvestorImage = () => {
  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md flex flex-col justify-start items-center">
      <img
        src="/bondimage.svg"
        alt="Treasury"
        className="max-w-full h-auto"
        style={{ width: '100%', maxWidth: '500px', marginTop: 0 }}
      />
    </div>
  );
};

export default VeMrayInvestorImage;

