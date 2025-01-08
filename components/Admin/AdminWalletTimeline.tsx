import React from 'react';

interface AdminWalletTimelineProps {
  walletAddress: string;
  onClick: () => void;
}

const AdminWalletTimeline: React.FC<AdminWalletTimelineProps> = ({
  walletAddress,
  onClick,
}) => {
  return (
    <div className="relative">
      {/* Icon */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-emerald-500"
            width="16"
            height="16"
          >
            <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
          </svg>
        </div>
      </div>

      {/* Card */}
      <div
        className="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 cursor-pointer hover:bg-slate-100 transition"
        onClick={onClick}
      >
        <p className="font-mono text-gray-800">{walletAddress}</p>
      </div>
    </div>
  );
};

export default AdminWalletTimeline;
