'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import { useMixpanel } from '../utils/analytics';

import { chains, config } from '../wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  useMixpanel();

  return (
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
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
