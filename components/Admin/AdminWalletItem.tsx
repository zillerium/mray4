import React from 'react';

interface AdminWalletItemProps {
  walletAddress: string;
  onClick: () => void;
}

const AdminWalletItem: React.FC<AdminWalletItemProps> = ({
  walletAddress,
  onClick,
}) => {
  return (
    <div
      className="relative bg-white p-4 rounded border border-slate-200 text-slate-500 shadow cursor-pointer hover:bg-slate-100 transition"
      onClick={onClick}
    >
      <p className="font-mono text-gray-800">{walletAddress}</p>
    </div>
  );
};

export default AdminWalletItem;
