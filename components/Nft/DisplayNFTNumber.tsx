import React from "react";
import DisplaySVGNumber from "@/components/Util/DisplaySVGNumber";

interface DisplayNFTNumberProps {
  selectedToken: number;
}

const DisplayNFTNumber: React.FC<DisplayNFTNumberProps> = ({
  selectedToken,
}) => {
  const digits = selectedToken.toString().split("").map(Number);

  return (
    <span className="inline-flex">
      {digits.map((digit, index) => (
        <DisplaySVGNumber key={index} digit={digit} />
      ))}
    </span>
  );
};

export default DisplayNFTNumber;

