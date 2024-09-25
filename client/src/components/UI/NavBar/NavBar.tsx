'use client';

import React from 'react';
import { useWallet } from '@/context/WalletProvider';

const NavBar: React.FC = () => {
  const { accounts, igcBalance, isConnected } = useWallet();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        {isConnected && accounts.length > 0 && (
          <>
            <img
              src={`https://robohash.org/${accounts[0]}`} // Example image URL, replace with your logic if needed
              alt="Wallet Account"
              className="w-8 h-8 rounded-full"
            />
            <span>{truncateAddress(accounts[0])}</span>
          </>
        )}
      </div>
      <div>
        {isConnected
          ? igcBalance !== null
            ? `IGC Balance: ${igcBalance}`
            : 'Loading...'
          : 'Not Connected'}
      </div>
    </nav>
  );
};

export default NavBar;
