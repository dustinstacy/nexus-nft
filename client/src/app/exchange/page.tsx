'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/context/WalletProvider';
import { igcABI, igcAddress } from '@/utils/constants';

const Exchange = () => {
  const { accounts, signer, updateIGCBalance } = useWallet();
  const [igcContract, setIGCContract] = useState<ethers.Contract | null>(null);
  const [amount, setAmount] = useState<number>(1); // Default to buying 1 IGC

  useEffect(() => {
    const initContract = async () => {
      if (signer) {
        try {
          const igcContractInstance = new ethers.Contract(
            igcAddress,
            igcABI,
            signer
          );
          setIGCContract(igcContractInstance);
          console.log('igcContractInstance:', igcContractInstance);

          // // Fetch token price from the contract
          // const price = await igcContractInstance.tokenPrice();
          // setTokenPrice(ethers.formatUnits(price, 'ether')); // Format price to Ether for display
        } catch (error) {
          console.error('Error initializing contract:', error);
        }
      }
    };

    initContract();
  }, [signer]);

  const handlePurchase = async () => {
    if (!igcContract) return;

    try {
      console.log(accounts);
      const tx = await igcContract.mint(accounts[0], amount);
      alert('Purchase successful!');
      console.log(tx);
      await updateIGCBalance();
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Transaction failed.');
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Exchange Ethereum for IGC Tokens</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-4"
        min="1"
        placeholder="Enter amount of IGC"
      />

      <button
        onClick={handlePurchase}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Purchase IGC
      </button>
    </div>
  );
};

export default Exchange;
