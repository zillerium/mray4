import React from 'react';
import CopyText from '@/components/Util/CopyText';

interface VotesTableProps {
  votesData: {
    voter: string;
    votes: number;
    price: number;
  }[];
}

const VotesTable: React.FC<VotesTableProps> = ({ votesData }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wallet Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Number of Votes
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {votesData.map((vote, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
               <CopyText copiedText={vote?.voter?.toString()} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {vote?.votes?.toString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {vote?.price?.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotesTable;

