import React, { useState } from 'react';
import { FaSync } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { Key } from 'lucide-react'; // Key icon for ownership
import ReadAllNfts from '@/components/ReadNft/ReadAllNfts';
import DisplayNftsDropDown from '@/components/Nft/DisplayNftsDropDown';
import DisplayHeading from '@/components/Util/DisplayHeading';
import ReadNftByTokenNumberOwner from '@/components/ReadNft/ReadNftByTokenNumberOwner';
import Navbar from '@/components/Navbar/Navbar';
import BondIssue from '@/components/Bond/BondIssue';
import CopyText from '@/components/Util/CopyText';
import GetBondPeriod from '@/components/Bond/GetBondPeriod';
import GetCR from '@/components/Bond/GetCR';
import CheckTreasuryApproval from '@/components/Util/CheckTreasuryApproval';
import ApproveBondTreasury from '@/components/Treasury/ApproveBondTreasury';
import DisplayHelpHeadings from '@/components/Bond/DisplayHelpHeadings';
import GetBondStatus from '@/components/Bond/GetBondStatus';
import GetFees from '@/components/Bond/GetFees';
import ApproveERC20Treasury from '@/components/Treasury/ApproveERC20Treasury';
import UnApproveERC20Treasury from '@/components/Treasury/UnApproveERC20Treasury';
import GetWalletHeader from '@/components/Util/GetWalletHeader';
import CheckERC20Allowance from '@/components/Util/CheckERC20Allowance';
import bondTreasuryContractAddress from '@/lib/bondTreasuryAddress.json'; // Treasury contract address
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';

const BondIssueCom: React.FC = () => {
  const [bondActive, setBondActive] = useState<boolean>(false); // New state
  const { address: userAddress } = useAccount();
  const [nftOwner, setNftOwner] = useState<string | null>(null); // New state
  const [tokenList, setTokenList] = useState<number[]>([]);
  const [selectedToken, setSelectedToken] = useState<number | null>(null);
  const [nftPrice, setNftPrice] = useState<string>(''); // For price
  const [bondCouponRate, setBondCouponRate] = useState<string>(''); // For coupon rate
  const [collateralizationRatio, setCollateralizationRatio] =
    useState<string>(''); // New state for CR

const calculateBondAmount = () => {
  const crValue = parseFloat(collateralizationRatio);
  const priceValue = parseFloat(nftPrice);
  if (!isNaN(crValue) && !isNaN(priceValue)) {
    return ((crValue * priceValue) / 100) * CURRENCY_FACTOR; // Convert to MRAY format
  }
  return 0;
};


  const bondContractAddress =
    bondTreasuryContractAddress.address as `0x${string}`;

  const handleTokenListUpdate = (newTokenList: number[]) =>
    setTokenList(newTokenList);

  const handleSelectToken = (token: number) => {
    setSelectedToken(token); // Explicitly using setSelectedToken
  };
  console.log('nft ======>', nftPrice);
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center">
        {/* Header */}
        <GetWalletHeader />
        {/* Help Headings */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full pb-4 mb-4">
          <h2
            className="text-2xl font-semibold"
            style={{ fontFamily: 'Open Sans', color: '#4d5898' }}
          >
            ISSUE AN NFT BOND
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          {[
            {
              header: '1. Select your NFT',
              text: 'Select your NFT.',
            },
            {
              header: '2. Set the Bond Financials',
              text: 'Set the price, coupon rate, and buying period.',
            },
            {
              header: '3. Issue the Bond',
              text: 'Bond once issued can be purchased.',
            },
            {
              header: '4. Approve the Treasury',
              text: 'Approve the Treasury to manage the Bond.',
            },
          ].map(({ header, text }, index) => (
            <DisplayHelpHeadings
              key={index}
              helpHeader={header}
              helpText={text}
            />
          ))}
        </div>

        {/* Main Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
          {/* Step 1: Select NFT */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <DisplayHeading headingText="1. Select NFT" />
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                onClick={() => handleTokenListUpdate(tokenList)}
              >
                <FaSync className="mr-2" /> NFTs
              </button>
              <div className="w-48">
                <ReadAllNfts onTokenListUpdate={handleTokenListUpdate} />
                {tokenList.length > 0 && (
                  <DisplayNftsDropDown
                    tokenList={tokenList}
                    onSelectToken={handleSelectToken}
                  />
                )}
              </div>
            </div>
            {selectedToken !== null && (
              <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg ">
                {/* Display Bond Status */}
                <GetBondStatus
                  nftId={selectedToken}
                  onBondStatusFetched={setBondActive}
                />{' '}
                {/* Pass callback */}
                <ReadNftByTokenNumberOwner
                  tokenNumber={selectedToken.toString()}
                  onOwnerFetched={setNftOwner} // New callback
                />
              </div>
            )}
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <DisplayHeading headingText="2. and 3. Issue Bond" />
            <GetBondPeriod />
            <GetCR onCrChange={setCollateralizationRatio} />
            <BondIssue
              tokenNumber={selectedToken?.toString() ?? ''}
              ownedNft={nftOwner === userAddress && !bondActive} // Check for ownership and bond status
              nftPrice={nftPrice} // Pass price
              setNftPrice={setNftPrice} // Callback for price
              bondCouponRate={bondCouponRate} // Pass coupon rate
              setBondCouponRate={setBondCouponRate} // Callback for coupon rate
              collateralizationRatio={collateralizationRatio} // Pass CR
            />
            {/* Button or Full GetFees Component */}
            {nftPrice && bondCouponRate ? (
              <GetFees nftPrice={nftPrice} bondCouponRate={bondCouponRate} />
            ) : (
              <button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded mt-4 cursor-not-allowed"
                disabled
              >
                Get Fees
              </button>
            )}
          </div>
          {/* Step 2 & 3: Set Valuation & Approve Vault */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
            <DisplayHeading headingText="4. Approve Treasury" />
            {nftOwner && (
              <div className="px-6 py-3 bg-stone-50 text-blue-600 text-1xl font-extrabold rounded-md mt-4 flex flex-col items-center">
                <span>NFT Owner:</span>
                <CopyText copiedText={nftOwner} />
              </div>
            )}
            <div className="flex items-center justify-center space-x-4 mt-4">
              {nftOwner === userAddress ? (
                // Render active "Approve the Vault" button if connected wallet matches NFT owner
                <ApproveBondTreasury
                  tokenId={selectedToken?.toString() ?? ''}
                />
              ) : (
                // Render greyed-out button if connected wallet does not match NFT owner
                <button
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
                  disabled
                >
                  Approve the Bond Treasury
                </button>
              )}
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4">
              {selectedToken !== null ? (
                nftOwner === bondContractAddress ? (
                  // If the bond treasury owns the NFT, show the key icon
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500">
                      <Key className="text-white w-5 h-5" />
                    </div>
                    <p className="text-yellow-500 font-bold">
                      Owned by Treasury
                    </p>
                  </div>
                ) : (
                  // Otherwise, check treasury approval
                  <CheckTreasuryApproval nftId={selectedToken} />
                )
              ) : (
                <p className="text-gray-500">
                  No NFT selected for approval check.
                </p>
              )}
            </div>
{/* Approve ERC20 Bond Treasury Section */}
<div className="flex items-center justify-center space-x-4 mt-4">
  {nftOwner === userAddress ? (
    <ApproveERC20Treasury amount={calculateBondAmount().toString()} />
  ) : (
    <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed" disabled>
      Approve ERC20 Treasury
    </button>
  )}
</div>
<div className="flex items-center justify-center space-x-4 mt-4">
  {userAddress && (
    <CheckERC20Allowance userAddress={userAddress} />
  )}
</div>
<div className="flex flex-col items-center space-y-4 mt-4">
  {/* Render CheckERC20Allowance */}

  {/* Render UnApproveERC20Treasury */}
  {userAddress && (
    <UnApproveERC20Treasury />
  )}
</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BondIssueCom;
