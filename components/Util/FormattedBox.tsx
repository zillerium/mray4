import React from 'react';

interface FormattedBoxProps {
  label: string;
  value: React.ReactNode;
  backgroundColor: string;
}

const FormattedBox: React.FC<FormattedBoxProps> = ({ label, value, backgroundColor }) => {
  return (
    <div
      className="mb-2 inline-flex flex-col items-center justify-center px-4 py-2 rounded-lg text-lg font-semibold text-black shadow-lg"
      style={{ backgroundColor }}
    >
      <span className="text-sm font-medium mb-1">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default FormattedBox;

