import React from "react";

const VeMayInvestorImage = () => {
  return (
    <div className="flex-1 bg-gray-200 p-6 rounded-lg shadow-md flex justify-center items-center">
      <img
        src="/voteescrow.svg"
        alt="Vote Escrow"
        className="max-w-full h-auto" // Ensures image scales responsively
        style={{ width: "100%", maxWidth: "500px" }} // Caps width for larger screens
      />
    </div>
  );
};

export default VeMayInvestorImage;

