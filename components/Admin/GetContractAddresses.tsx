import React from 'react';

// Import JSON files with addresses
import bondQueryTreasuryAddress from '@/lib/bondQueryTreasuryAddress.json';
import mintContractAddress from '@/lib/mintContractAddress.json';
import usdcAddress from '@/lib/usdcAddress.json';
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json';
import uniContractAddress from '@/lib/uniContractAddress.json';
import usdcTreasuryAddress from '@/lib/usdcTreasuryAddress.json';

const GetContractAddresses: React.FC = () => {
  // Map contract names to their respective addresses
  const contractData = [
    { name: 'Bond Query', address: bondQueryTreasuryAddress.address },
    { name: 'ERC20 MRAY', address: mintContractAddress.address },
    { name: 'ERC20 USDC', address: usdcAddress.address },
    { name: 'Bond Treasury', address: bondTreasuryAddress.address },
    { name: 'NFT', address: uniContractAddress.address },
    { name: 'USDC Treasury', address: usdcTreasuryAddress.address },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Contract Addresses</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
          </tr>
        </thead>
        <tbody>
          {contractData.map((contract, index) => (
            <tr key={index} className="even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{contract.name}</td>
              <td className="border border-gray-300 px-4 py-2">{contract.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetContractAddresses;

