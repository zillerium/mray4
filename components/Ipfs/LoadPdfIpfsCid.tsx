import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';  // Importing an icon from react-icons

interface LoadPdfIpfsCidProps {
  enabledButton: boolean;
  onPdfClientNameChange: (name: string) => void;
  onIpfsCidChange: (cid: string) => void;
}

const LoadPdfIpfsCid: React.FC<LoadPdfIpfsCidProps> = ({ enabledButton, onPdfClientNameChange, onIpfsCidChange }) => {
  const [productPdf, setProductPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

  const onChangePdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductPdf(file);
      onPdfClientNameChange(file.name);  // Pass PDF name to parent
    }
  };

  const loadIpfsPdf = async () => {
    if (!productPdf) return;

    const formData = new FormData();
    formData.append('file', productPdf);

    setLoading(true);

    try {
      const formDataBoundary = (formData as unknown as { _boundary?: string })._boundary;
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formDataBoundary || ''}`,
          'Authorization': `Bearer ${JWT}`,
        }
      });

      const { IpfsHash } = res.data;
      onIpfsCidChange(IpfsHash);  // Pass IPFS CID to parent
    } catch (error) {
      console.error("Error uploading to IPFS: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4 w-full max-w-xs">
        <label
          htmlFor="pdf-btn"
          className={`flex items-center justify-center space-x-2 py-2 px-4 rounded cursor-pointer ${enabledButton ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
        >
          <FaUpload className="w-4 h-4" />  {/* Icon for the upload button */}
          <span>PDF</span>
          <input
            type="file"
            id="pdf-btn"
            onChange={onChangePdf}
            accept="application/pdf"
            className="hidden"
            disabled={!enabledButton}
          />
        </label>
        <button
          onClick={loadIpfsPdf}
          disabled={!enabledButton || loading}
          className={`flex items-center justify-center py-2 px-4 rounded ${enabledButton && !loading ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
        >
          {loading ? (
            <>
              <svg
                className="inline mr-2 w-4 h-4 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c-1.657 0-3.156-.408-4.472-1.128l1.34-2.68C9.14 21.16 10.537 22 12 22v2z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            "Save PDF"
          )}
        </button>
      </div>
    </div>
  );
};

export default LoadPdfIpfsCid;

