'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface WalletContextType {
  isConnected: boolean;
  accounts: string[];
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccounts(accounts);
        }
      }
    };

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccounts(accounts);
      } else {
        setIsConnected(false);
        setAccounts([]);
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    checkConnection();

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  const connectWallet = async () => {
    if (!isConnected && typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        setIsConnected(true);
        setAccounts(accounts);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    }
  };

  return (
    <WalletContext.Provider value={{ isConnected, accounts, connectWallet }}>
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
