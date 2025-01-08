import React from 'react';

const HomeCarCapital = () => (
  <div className="flex justify-center items-center w-full mt-6">
    {/* Scale down to two-thirds size */}
    <img
      src="/carcapital.svg"
      alt="Car Capital"
      className="w-2/3 max-w-xs md:max-w-sm lg:max-w-md"
    />
  </div>
);

export default HomeCarCapital;
