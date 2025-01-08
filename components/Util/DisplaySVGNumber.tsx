// components/DisplaySVGNumber.tsx

import React from 'react';

interface DisplaySVGNumberProps {
  digit: number;
}

const DisplaySVGNumber: React.FC<DisplaySVGNumberProps> = ({ digit }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="72"
      viewBox="0 0 48 72"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="72"
        fontFamily="'Montserrat', sans-serif"
        fill="#230b59"
      >
        {digit}
      </text>
    </svg>
  );
};

export default DisplaySVGNumber;
