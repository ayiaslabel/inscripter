'use client';
import * as React from "react";
import { NextUIProvider } from '@nextui-org/system';
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
          locale="en-US"
          theme={darkTheme({
            accentColor: '#45D620',
            accentColorForeground: 'white',
            // borderRadius: 'small',
            fontStack: 'rounded',
            overlayBlur: 'small',
          })}
          chains={chains}
        >
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  );
}
