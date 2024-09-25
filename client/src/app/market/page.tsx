'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/context/WalletProvider';
import { cardsABI, cardsAddress } from '@/utils/constants';

const Market = () => {
  const { accounts, signer } = useWallet();
  const [minter, setMinter] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (signer) {
        try {
          const minterInstance = new ethers.Contract(
            cardsAddress,
            cardsABI,
            signer
          );
          setMinter(minterInstance);
        } catch (error) {
          console.error('Error initializing contracts:', error);
        }
      }
    };

    initContract();
  }, [signer, accounts]);

  const mintCard = async (cardId: number) => {
    if (!minter) {
      console.error('Minter contract is not initialized');
      return;
    }

    try {
      await minter.mintCard(cardId);
      console.log('Minted Card', cardId);
    } catch (error) {
      console.error('Error minting card:', error);
    }
  };
  return <div>Market</div>;
};

export default Market;
