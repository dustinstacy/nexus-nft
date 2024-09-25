'use client';

import React, { useEffect } from 'react';
import Menu from './menu/page';
import Button1 from '../components/UI/Buttons/Button1';
import { useWallet } from '../context/WalletProvider';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isConnected, connectWallet } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/menu');
    }
  }, [isConnected, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {isConnected ? (
          <>
            <Menu />
          </>
        ) : (
          <Button1 onClick={connectWallet}>Connect Wallet</Button1>
        )}
      </main>
    </div>
  );
}
