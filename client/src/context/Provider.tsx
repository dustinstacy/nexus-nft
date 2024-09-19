"use client";

import React, { FC, PropsWithChildren } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../context/config';

const queryClient = new QueryClient();

const Provider: FC<PropsWithChildren> = ({ children }) => {
    return (
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>


    );
};

export default Provider;