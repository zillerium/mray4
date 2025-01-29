import React from 'react';
import GetBondTreasuryUSDCVault from './GetBondTreasuryUSDCVault';
import GetUSDCTreasuryBond from './GetUSDCTreasuryBond';
import GetERC20Whitelist from './GetERC20Whitelist';
import SetBondTreasuryUSDCVault from './SetBondTreasuryUSDCVault';
import SetUSDCTreasuryBond from './SetUSDCTreasuryBond';
import SetERC20Whitelist from './SetERC20Whitelist';

const ManageContractApprovals: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Contract Approvals</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Contract</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">BondTreasury</td>
            <td className="border border-gray-300 px-4 py-2">
              <GetBondTreasuryUSDCVault />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <SetBondTreasuryUSDCVault />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">USDCTreasury</td>
            <td className="border border-gray-300 px-4 py-2">
              <GetUSDCTreasuryBond />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <SetUSDCTreasuryBond />
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">ERC20 MRAY</td>
            <td className="border border-gray-300 px-4 py-2">
              <GetERC20Whitelist />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <SetERC20Whitelist />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageContractApprovals;

