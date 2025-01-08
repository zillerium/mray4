// components/NftDateRange.tsx

import React, { useState } from 'react';

interface NftDateRangeProps {
  tokenNumber: string;
  setSelectedDate: (date: string) => void; // Prop to handle the date change
}

const NftDateRange: React.FC<NftDateRangeProps> = ({
  tokenNumber,
  setSelectedDate,
}) => {
  const [priceDate, setPriceDate] = useState<string>('');

  const handlePriceDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPriceDate(event.target.value);
    setSelectedDate(event.target.value); // Pass the selected date to the parent component
  };

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">
        Set End Date for Voting on {tokenNumber}
      </h3>
      <input
        type="date"
        value={priceDate}
        onChange={handlePriceDateChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300" // Tailwind classes for styling
      />
    </div>
  );
};

export default NftDateRange;
