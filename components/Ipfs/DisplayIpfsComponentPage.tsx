// components/DisplayIpfsComponentPage.tsx

import React from "react";

// Define an interface for the component props
interface DisplayIpfsComponentPageProps {
  carModelUri: string; // Explicitly define the type of carModelUri
}

const DisplayIpfsComponentPage: React.FC<DisplayIpfsComponentPageProps> = ({ carModelUri }) => {
  const ipfsLink = `https://rose-wonderful-crab-70.mypinata.cloud/ipfs/${carModelUri}`;

  return (
    <div className="border rounded p-3 mt-3 lg:mt-0 lg:ml-3">
      {carModelUri ? (
        <>
          <img
            src={ipfsLink}
            alt="IPFS Image"
            className="h-50 d-inline-block"
            style={{ width: 500, backgroundColor: "rgba(0, 0, 255, 0.1)" }}
          />
          <a
            href={ipfsLink}
            className="text-blue-600 underline mt-2 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            View full image
          </a>
        </>
      ) : (
        <div className="text-center">Car image</div>
      )}
    </div>
  );
};

export default DisplayIpfsComponentPage;

