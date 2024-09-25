'use client';

import React, { useEffect } from 'react';
import Menu from './menu/page';
import Button1 from '../components/UI/Buttons/Button1';
import { useWallet } from '@/context/WalletProvider';
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
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] flex items-center justify-center">
      <main className="flex flex-col gap-8">
        {isConnected ? (
          <Menu />
        ) : (
          <Button1 onClick={connectWallet}>Connect Wallet</Button1>
        )}
      </main>
    </div>
  );
}
