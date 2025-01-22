import React from 'react';
import DisplaySVGNumber from '@/components/Util/DisplaySVGNumber';

interface DisplayBondNumberProps {
  selectedToken: number;
}

const DisplayBondNumber: React.FC<DisplayBondNumberProps> = ({
  selectedToken,
}) => {
  const digits = selectedToken.toString().split('').map(Number);

  return (
    <span className="inline-flex">
      {digits.map((digit, index) => (
        <DisplaySVGNumber key={index} digit={digit} />
      ))}
    </span>
  );
};

export default DisplayBondNumber;
