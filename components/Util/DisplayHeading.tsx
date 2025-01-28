import React from 'react';

interface DisplayHeadingProps {
  headingText: string; // The string to display
}

const DisplayHeading: React.FC<DisplayHeadingProps> = ({ headingText }) => {
  return (
    <h3
      className="text-xl md:text-2xl font-semibold leading-snug mt-4"
      style={{ fontFamily: "'Open Sans', sans-serif", color: '#4d5898' }}
    >
      {headingText}
    </h3>
  );
};

export default DisplayHeading;

