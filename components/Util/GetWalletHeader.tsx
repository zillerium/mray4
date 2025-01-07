import React from "react";
import { useAccount } from "wagmi";

const GetWalletHeader: React.FC = () => {
  const { isConnected } = useAccount();
  return (
    <header className="w-full py-4 flex justify-between items-center">
      <div className="flex items-center">
        {isConnected ? (
          <div className="mr-4">
            <w3m-account-button balance="show" />
          </div>
        ) : (
          <span className="text-red-500 text-lg font-bold">
            Please connect your wallet
          </span>
        )}
      </div>
    </header>
  );
};

export default GetWalletHeader;

