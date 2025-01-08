import React from 'react';

interface VotingTableProps {
  lowerLimit: number | null;
  upperLimit: number | null;
  endDate: string | null;
  votingActive: boolean | null;
}

const VotingTable: React.FC<VotingTableProps> = ({
  lowerLimit,
  upperLimit,
  endDate,
  votingActive,
}) => {
  if (!votingActive) {
    return (
      <div className="w-full bg-green-100 text-green-700 p-4 rounded-md shadow-md text-center">
        Voting did not start yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">End of Voting</th>
            <th className="px-4 py-2 border">Voting Started</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border text-center">
              {lowerLimit !== null ? `${lowerLimit} USD` : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {endDate !== null ? endDate : 'Loading...'}
            </td>
            <td className="px-4 py-2 border text-center">
              {votingActive ? 'Yes' : 'No'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VotingTable;
