import React from 'react';

interface FormattedBoxProps {
  label: string;
  value: React.ReactNode;
  backgroundColor: string;
  className?: string;
}

const FormattedBox: React.FC<FormattedBoxProps> = ({
  label,
  value,
  backgroundColor,
  className,
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md ${className}`}
      style={{ backgroundColor }}
    >
      <div className="text-center">
        <span className="text-xl md:text-2xl font-bold text-black block mt-1">
          {label}
        </span>
        <span className="text-base md:text-lg font-medium text-black block">
          {value}
        </span>
      </div>
    </div>
  );
};

export default FormattedBox;

