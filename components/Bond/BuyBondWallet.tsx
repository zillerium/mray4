import React, { useState } from 'react';
import { useWriteContract } from 'wagmi';
import bondTreasuryABI from '@/lib/bondTreasuryABI.json'; // Import ABI for the bond treasury contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Import contract address for bond treasury
import { reformatCurrency } from '@/components/Util/ReformatCurrency';
import ShowTxnHash from '@/components/Util/ShowTxnHash'; // Import the ShowTxnHash component

interface BuyBondWalletProps {
  nftId: number; // Expecting a number since it's parsed before passed
}

const vaultContractAddress = bondTreasuryAddress.address as `0x${string}`;

const BuyBondWallet: React.FC<BuyBondWalletProps> = ({ nftId }) => {
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
      // Call the fundBond function on the bond treasury contract
      writeContract({
        address: vaultContractAddress,
        abi: bondTreasuryABI,
        functionName: 'fundBond',
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
        Buy Bond
      </button>

      {/* Use ShowTxnHash to display transaction hash and status */}
      <ShowTxnHash
        txnStatus={txnStatus}
        transactionHash={transactionHash ? transactionHash.toString() : null}
        error={error}
      />
    </div>
  );
};

export default BuyBondWallet;

