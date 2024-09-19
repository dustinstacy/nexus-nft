'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnect } from 'wagmi';
import Board from '../components/Board/Board';

export default function Home() {
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const connectWallet = () => {
    connect({ connector: connectors[0] });
    console.log('clicked');
  };

  if (!isMounted) {
    // Prevent rendering until component is mounted to avoid hydration issues
    return null;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {isConnected ? (
          <Board />
        ) : (
          <button className="btn btn-primary" onClick={() => connectWallet()}>
            Connect Wallet
          </button>
        )}
      </main>
    </div>
  );
}
