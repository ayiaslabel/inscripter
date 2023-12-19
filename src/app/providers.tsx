'use client';
import React from "react";
import {NextUIProvider} from '@nextui-org/react'
import {Progress} from "@nextui-org/react";

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { useMixpanel } from '../utils/analytics';


import { chains, config } from '../wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  useMixpanel();

  return (
    <NextUIProvider>
    <WagmiConfig config={config}>
      
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: '#45D620',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        chains={chains}
      >    
          <div className="flex flex-col gap-6 w-full max-w-md">
            <Progress size="sm" aria-label="Loading..." value={30} />
            <Progress size="md" aria-label="Loading..." value={40} />
            <Progress size="lg" aria-label="Loading..." value={50} />
          </div> 
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
    </NextUIProvider>

  );
}