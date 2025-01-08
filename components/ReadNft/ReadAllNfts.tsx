import React, { useState, useEffect } from 'react';
import ReadTokenCounter from '@/components/Nft/ReadTokenCounter';

interface ReadAllNftsProps {
  onTokenListUpdate: (tokenList: number[]) => void;
}

const ReadAllNfts: React.FC<ReadAllNftsProps> = ({ onTokenListUpdate }) => {
  const [tokenCounter, setTokenCounter] = useState<number | null>(null);
  const [tokenList, setTokenList] = useState<number[]>([]);

  useEffect(() => {
    if (tokenCounter !== null && tokenCounter !== tokenList.length) {
      // Generate list starting from 1
      const newTokenList = Array.from(
        { length: tokenCounter },
        (_, i) => i + 1,
      );
      setTokenList(newTokenList);
      onTokenListUpdate(newTokenList); // Pass the updated token list to the parent
    }
  }, [tokenCounter, onTokenListUpdate]);

  const onTokenCounterRead = (counter: number) => {
    setTokenCounter(counter);
  };

  return (
    <div>
      <ReadTokenCounter onTokenCounterRead={onTokenCounterRead} />
    </div>
  );
};

export default ReadAllNfts;
