import React, { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import mintContractABI from '@/lib/mintContractABI.json'; // ABI for MintableERC20
import mintContractAddress from '@/lib/mintContractAddress.json'; // Address for MintableERC20 contract
import bondTreasuryAddress from '@/lib/bondTreasuryAddress.json'; // Address for the Bond Treasury contract
import { CURRENCY_FACTOR } from '@/components/Util/ReformatCurrency';
import { Check, X } from 'lucide-react'; // Tick and cross icons

interface CheckERC20AllowanceProps {
  userAddress: string; // Address of the user whose allowance is checked
}

const CheckERC20Allowance: React.FC<CheckERC20AllowanceProps> = ({ userAddress }) => {
  const contractAddress = mintContractAddress.address as `0x${string}`;
  const bondAddress = bondTreasuryAddress.address as `0x${string}`;

  const [allowance, setAllowance] = useState<number | null>(null);

  // Call the `allowance` function from the ERC20 contract
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: mintContractABI,
    functionName: 'allowance',
    args: [userAddress, bondAddress], // Check allowance from user to bond contract
  });

  useEffect(() => {
    if (data !== undefined) {
      setAllowance(Number(data) / CURRENCY_FACTOR); // Convert from smallest unit (MRAY has 6 decimals)
    } else if (isError) {
      setAllowance(null); // Reset in case of error
    }
  }, [data, isError]);

  return (
    <div>
      {isLoading && <p>Checking ERC20 Allowance...</p>}
      {!isLoading && allowance !== null && (
        <div className="flex items-center space-x-4">
          {allowance > 0 ? (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                <Check className="text-green-500 w-5 h-5" />
              </div>
              <p className="text-green-500">Approved: {allowance.toLocaleString()} MRAY</p>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                <X className="text-red-500 w-5 h-5" />
              </div>
              <p className="text-red-500">Not Approved</p>
            </div>
          )}
        </div>
      )}
      {!isLoading && allowance === null && (
        <p className="text-red-500">
          Error checking ERC20 allowance.
        </p>
      )}
    </div>
  );
};

export default CheckERC20Allowance;

