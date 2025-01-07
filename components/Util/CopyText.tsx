import React, { useState, useRef } from 'react';
import { FaRegCopy } from 'react-icons/fa'; // Import copy icon from Font Awesome

interface CopyTextProps {
  copiedText: string;
}

const CopyText: React.FC<CopyTextProps> = ({ copiedText }) => {
  const [copySuccess, setCopySuccess] = useState<string>('');
  const shortenedMarketId = `${copiedText.slice(0, 6)}...${copiedText.slice(-6)}`;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyClick = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      // Use clipboard API if available and secure
      try {
        await navigator.clipboard.writeText(copiedText);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy');
        console.error('Failed to copy: ', err);
      }
    } else {
      // Fallback to document.execCommand
      if (textAreaRef.current) {
        textAreaRef.current.select();
        try {
          document.execCommand('copy');
          setCopySuccess('Copied!');
        } catch (err) {
          setCopySuccess('Failed to copy');
          console.error('Failed to copy: ', err);
        }
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <p className="bg-gray-200 px-4 py-2 rounded">{shortenedMarketId}</p>
      <button onClick={handleCopyClick} className="text-blue-500 hover:text-blue-700">
        <FaRegCopy size={20} /> {/* Display copy icon */}
      </button>
      {copySuccess && <span className="text-blue-500">{copySuccess}</span>}
      
      {/* Hidden text area for fallback copy method */}
      <textarea
        ref={textAreaRef}
        value={copiedText}
        readOnly
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      />
    </div>
  );
};

export default CopyText;

