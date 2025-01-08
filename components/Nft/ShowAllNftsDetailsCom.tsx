import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import LoadPdfIpfsCid from '@/components/Ipfs/LoadPdfIpfsCid';
import AddIpfsNftDoc from '@/components/Ipfs/AddIpfsNftDoc';
import CopyText from '@/components/Util/CopyText';
import CheckDocUser from '@/components/Util/CheckDocUser';

interface ShowAllNftsDetailsComProps {
  selectedToken: number;
}

const ShowAllNftsDetailsCom: React.FC<ShowAllNftsDetailsComProps> = ({
  selectedToken,
}) => {
  const { address: userAddress } = useAccount();
  const [pdfClientName, setPdfClientName] = useState<string>('');
  const [ipfsPdfCid, setIpfsPdfCid] = useState<string>('');
  const [isDocUser, setIsDocUser] = useState<boolean | null>(null); // To track doc user permissions
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true); // To track permission checking

  useEffect(() => {
    if (userAddress) {
      setCheckingStatus(true);
    }
  }, [userAddress]);

  const handlePdfClientNameChange = (name: string) => {
    setPdfClientName(name);
  };

  const handleIpfsCidChange = (cid: string) => {
    setIpfsPdfCid(cid);
  };

  const handleDocUserCheck = (result: boolean) => {
    setIsDocUser(result);
    setCheckingStatus(false);
  };

  return (
    <div className="flex flex-col items-center mt-4 space-y-8">
      {/* Check Doc User */}
      {userAddress && (
        <CheckDocUser
          walletAddress={userAddress}
          nftId={selectedToken}
          onResult={handleDocUserCheck}
        />
      )}

      {/* Conditional Rendering */}
      {checkingStatus ? (
        <p>Checking Permissions...</p>
      ) : isDocUser === true ? (
        <div className="w-full max-w-md mt-4">
          <LoadPdfIpfsCid
            enabledButton={!!selectedToken}
            onPdfClientNameChange={handlePdfClientNameChange}
            onIpfsCidChange={handleIpfsCidChange}
          />
          {pdfClientName && <div className="text-lg mt-2">{pdfClientName}</div>}
          {ipfsPdfCid && (
            <div className="mt-2 p-4 bg-yellow-100 rounded-lg">
              IPFS PDF CID:{' '}
              <a
                href={`https://rose-wonderful-crab-70.mypinata.cloud/ipfs/${ipfsPdfCid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                <CopyText copiedText={ipfsPdfCid} />
              </a>
            </div>
          )}
          {ipfsPdfCid && (
            <div className="w-full max-w-md mt-4">
              <AddIpfsNftDoc ipfsAddress={ipfsPdfCid} nftId={selectedToken} />
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-500">
          Only approved users may add PDFs to this NFT.
        </p>
      )}
    </div>
  );
};

export default ShowAllNftsDetailsCom;
