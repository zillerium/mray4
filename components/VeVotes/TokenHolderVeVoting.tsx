import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import vaultNFTABI from '@/lib/vaultNFTABI.json'; // Import ABI for veToken valuation contract
import vaultNFTAddress from '@/lib/vaultNFTAddress.json'; // Import contract address for veToken valuation contract
import { reformatCurrency } from '@/components/Util/ReformatCurrency';

interface TokenHolderVeVotingProps {
  nftId: number; // Expecting a number since it's parsed before passed
}

const vaultContractAddress = vaultNFTAddress.address as `0x${string}`;

const TokenHolderVeVoting: React.FC<TokenHolderVeVotingProps> = ({ nftId }) => {
  const [price, setPrice] = useState<string>(''); // State to store the vote price
  const [txnStatus, setTxnStatus] = useState<string | null>(null);

  // Initialize the contract write function using wagmi's useWriteContract
  const { data: transactionHash, writeContract, error } = useWriteContract();

  const handleVoteClick = async () => {
    if (!price) {
      alert('Please enter a valid price.');
      return;
    }

    // Scale the input price
    const reformattedPrice = reformatCurrency(price);
    if (reformattedPrice === null) {
      alert('Please enter a valid numeric price.');
      return;
    }

    setTxnStatus('Processing your transaction...'); // Set the message immediately after clicking the button

    try {
      // Call the vote function on the veToken smart contract
      writeContract({
        address: vaultContractAddress,
        abi: vaultNFTABI,
        functionName: 'vote',
        args: [nftId, Number(reformattedPrice)], // Pass the NFT ID and the price
      });

      setTxnStatus('Transaction submitted...');
    } catch (e) {
      console.error('Transaction failed:', e);
      setTxnStatus('Transaction failed');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="mb-4 p-2 border rounded-md w-full max-w-xs"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleVoteClick}
        disabled={txnStatus === 'Transaction submitted...'}
      >
        Vote Price
      </button>

      {/* Display the transaction status message directly */}
      {txnStatus && <div className="text-lg mt-2">{txnStatus}</div>}
      {transactionHash && (
        <div className="text-lg mt-2">Transaction Hash: {transactionHash}</div>
      )}
      {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
    </div>
  );
};

export default TokenHolderVeVoting;
