import React from "react";

interface DisplayHelpHeadingsProps {
  helpHeader: string;
  helpText: string;
}

const DisplayHelpHeadings: React.FC<DisplayHelpHeadingsProps> = ({ helpHeader, helpText }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg text-center shadow-blue-400">
      <h2 style={{ color: "#230b59", fontSize: "24px" }} className="font-semibold">
        {helpHeader}
      </h2>
      <p style={{ color: "#230b59" }}>{helpText}</p>
    </div>
  );
};

export default DisplayHelpHeadings;

