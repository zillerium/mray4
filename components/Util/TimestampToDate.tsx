import React from 'react';

interface TimestampToDateProps {
  timestamp: bigint; // Expecting a BigInt for the timestamp
}

const TimestampToDate: React.FC<TimestampToDateProps> = ({ timestamp }) => {
  const date = new Date(Number(timestamp) * 1000); // Convert seconds to milliseconds and create a Date object

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <span>{formattedDate}</span>;
};

export default TimestampToDate;
