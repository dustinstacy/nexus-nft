import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '../context/WalletProvider';
import NavBar from '@/components/UI/NavBar/NavBar';

export const metadata: Metadata = {
  title: 'Nexus NFT',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <WalletProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
