'use client';
import * as React from "react";
import { NextUIProvider } from '@nextui-org/system'; // 공식 문서에 따라 적절한 모듈을 사용하세요

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { useMixpanel } from '../utils/analytics';
import { chains, config } from '../wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  useMixpanel();

  // NextUIProvider를 다른 Provider들의 상위 레벨에 배치
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
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  );
}
