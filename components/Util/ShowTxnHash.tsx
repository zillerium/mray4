import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import CopyText from '@/components/Util/CopyText';

interface ShowTxnHashProps {
  txnStatus: string | null;
  transactionHash: string | null;
  error: Error | null;
}

const ShowTxnHash: React.FC<ShowTxnHashProps> = ({
  txnStatus,
  transactionHash,
  error,
}) => {
  return (
    <div className="w-full max-w-md">
      {/* Transaction Status */}
      {txnStatus && (
        <div className="text-gray-600 text-sm mt-2">{txnStatus}</div>
      )}

      {/* Transaction Hash with Copy and Link */}
      {transactionHash && (
        <div className="text-sm mt-2 flex items-center">
          Transaction Hash: <CopyText copiedText={transactionHash} />{' '}
          <a
            href={`https://sepolia.basescan.org/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-500"
          >
            <FaExternalLinkAlt className="inline-block" />
          </a>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-sm mt-2">Error2: {error.message}</div>
      )}
    </div>
  );
};

export default ShowTxnHash;
