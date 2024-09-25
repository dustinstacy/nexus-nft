'use client';

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '@/context/WalletProvider';
import { purchaseIGCABI, purchaseIGCAddress } from '@/utils/constants';

const Exchange = () => {
  const { accounts, signer } = useWallet();
  const [purchaseIGCContract, setPurchaseIGCContract] =
    useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initContract = async () => {
      if (signer) {
        try {
          const purchaseIGCContractInstance = new ethers.Contract(
            purchaseIGCAddress,
            purchaseIGCABI,
            signer
          );
          setPurchaseIGCContract(purchaseIGCContractInstance);
        } catch (error) {
          console.error('Error initializing contracts:', error);
        }
      }
    };

    initContract();
  }, [signer, accounts]);
  return <div>Exchange</div>;
};

export default Exchange;
