'use client';

import React, { useEffect, useState } from 'react';
import Board from '../components/Board/Board';
import { useWallet } from '../context/WalletProvider';

export default function Home() {
  const { isConnected, accounts, igcBalance, connectWallet } = useWallet();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {isConnected ? (
          <>
            <Board />
            <p>Total IGC: </p>
            {igcBalance && <p>{igcBalance}</p>}
            <p>
              Account:{' '}
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
