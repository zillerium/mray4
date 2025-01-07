"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { FaLock, FaLockOpen } from "react-icons/fa"; // Import lock icons

export default function CustomButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Base style for shared padding and font
  const baseStyle = "px-4 py-2 font-bold rounded-lg transition-all duration-300 ease-in-out";

  if (isConnected)
    return (
      <button
        onClick={() => disconnect()}
        className={`${baseStyle} bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent`}
      >
        <FaLockOpen className="mr-2 inline" /> {/* Unlocked icon for connected state */}
        Disconnect
      </button>
    );

  return (
    <button
      onClick={() => open()}
      className={`${baseStyle} bg-blue-500 hover:bg-blue-700 text-white border border-blue-700`}
    >
      <FaLock className="mr-2 inline" /> {/* Locked icon for disconnected state */}
      Connect Wallet
    </button>
  );
}

