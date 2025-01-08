import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa'; // External link icon

interface ShowUrlLinkProps {
  baseUrl: string; // Base URL (e.g., "https://sepolia.basescan.org/address/")
  path: string; // The specific path to append to the base URL
  className?: string; // Optional custom className for styling
}

const ShowUrlLink: React.FC<ShowUrlLinkProps> = ({
  baseUrl,
  path,
  className,
}) => {
  return (
    <a
      href={`${baseUrl}${path}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className || 'text-blue-500 hover:underline'}
    >
      <FaExternalLinkAlt />
    </a>
  );
};

export default ShowUrlLink;
