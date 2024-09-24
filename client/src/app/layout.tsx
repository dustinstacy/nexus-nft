import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '../context/WalletProvider';

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
      <body className={`antialiased`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
