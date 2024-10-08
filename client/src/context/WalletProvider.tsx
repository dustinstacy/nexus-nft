'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { igcABI, igcAddress } from '../utils/constants';
import { useRouter } from 'next/navigation';

interface WalletContextType {
  isConnected: boolean;
  accounts: string[];
  connectWallet: () => Promise<void>;
  igcBalance: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  updateIGCBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [igcBalance, setIGCBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setIsConnected(true);
        setAccounts(accounts);
        provider?.getSigner().then(setSigner);
        fetchIGCBalance(accounts[0]);
      } else {
        setIsConnected(false);
        setAccounts([]);
        setIGCBalance(null);
        router.push('/');
      }
    };

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

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    checkConnection();

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [router]);

  const fetchIGCBalance = async (account: string) => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(igcAddress, igcABI, provider);
        const balance = await contract.balanceOf(account);
        setIGCBalance(balance);
      } catch (error) {
        console.error('Error fetching IGC balance:', error);
      }
    } else {
      console.error('Ethereum provider is not available');
    }
  };

  const updateIGCBalance = async () => {
    if (accounts.length > 0) {
      await fetchIGCBalance(accounts[0]);
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
        updateIGCBalance,
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
