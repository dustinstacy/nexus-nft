'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { currencyABI, currencyAddress } from '../utils/constants';

interface WalletContextType {
  isConnected: boolean;
  accounts: string[];
  connectWallet: () => Promise<void>;
  igcBalance: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [igcBalance, setIGCBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    checkConnection();

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const accounts = await provider.send('eth_accounts', []);
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccounts(accounts);
        const signer = await provider.getSigner();
        setSigner(signer);
        await fetchIGCBalance(accounts[0]);
      }
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length > 0) {
      setIsConnected(true);
      setAccounts(accounts);
      const signer = await provider?.getSigner();
      setSigner(signer as ethers.Signer);
      await fetchIGCBalance(accounts[0]);
    } else {
      setIsConnected(false);
      setAccounts([]);
      setIGCBalance(null);
    }
  };

  const fetchIGCBalance = async (account: string) => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          currencyAddress,
          currencyABI,
          provider
        );
        const balance = await contract.balanceOf(account);
        setIGCBalance((BigInt(balance) / BigInt(10 ** 18)).toString());
      } catch (error) {
        console.error('Error fetching IGC balance:', error);
      }
    } else {
      console.error('Ethereum provider is not available');
    }
  };

  const connectWallet = async () => {
    if (!isConnected && typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        setIsConnected(true);
        setAccounts(accounts);
        const signer = await provider?.getSigner();
        setSigner(signer as ethers.Signer);
        await fetchIGCBalance(accounts[0]);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        accounts,
        connectWallet,
        igcBalance,
        provider,
        signer,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
