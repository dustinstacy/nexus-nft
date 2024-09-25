'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/context/WalletProvider';
import { piecesABI, piecesAddress } from '@/utils/constants';

const Inventory = () => {
  const { accounts, signer } = useWallet();
  const [piecesContract, setPiecesContract] = useState<ethers.Contract | null>(
    null
  );

  useEffect(() => {
    const initContract = async () => {
      if (signer) {
        try {
          const piecesContractInstance = new ethers.Contract(
            piecesAddress,
            piecesABI,
            signer
          );
          setPiecesContract(piecesContractInstance);
        } catch (error) {
          console.error('Error initializing contracts:', error);
        }
      }
    };

    initContract();
  }, [signer, accounts]);
  return <div>Inventory</div>;
};

export default Inventory;
