import { http, createConfig } from 'wagmi';
import { hardhat, localhost, mainnet, sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [hardhat, mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [hardhat.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
