'use client';

import React, { useEffect, useState } from 'react';
import Board from '../components/Board/Board';

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

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

    if (isMounted && typeof window !== 'undefined') {
      window.ethereum?.on('accountsChanged', handleAccountsChanged);
      checkConnection();

      return () => {
        window.ethereum?.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      };
    }
  }, [isMounted]);

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

  if (!isMounted) {
    return null; // Prevent rendering until mounted
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {isConnected ? (
          <>
            <Board />
            <p>
              Connected Accounts:{' '}
              {accounts
                .map(
                  (account) => `${account.slice(0, 7)}...${account.slice(-4)}`
                )
                .join(', ')}
            </p>{' '}
          </>
        ) : (
          <button className="btn btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </main>
    </div>
  );
}
