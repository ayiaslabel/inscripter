'use client';

import { RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import * as React from 'react';
import { WagmiConfig } from 'wagmi';
import { useMixpanel } from '../utils/analytics';

import { chains, config } from '../wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  useMixpanel();
  const myCustomTheme: Theme = {
    colors: {
      connectButtonBackground: '#FFFFFF',
      accentColor: '',
      accentColorForeground: '',
      actionButtonBorder: '',
      actionButtonBorderMobile: '',
      actionButtonSecondaryBackground: '',
      closeButton: '',
      closeButtonBackground: '',
      connectButtonBackgroundError: '',
      connectButtonInnerBackground: '',
      connectButtonText: '',
      connectButtonTextError: '',
      connectionIndicator: '',
      downloadBottomCardBackground: '',
      downloadTopCardBackground: '',
      error: '',
      generalBorder: '',
      generalBorderDim: '',
      menuItemBackground: '',
      modalBackdrop: '',
      modalBackground: '',
      modalBorder: '',
      modalText: '',
      modalTextDim: '',
      modalTextSecondary: '',
      profileAction: '',
      profileActionHover: '',
      profileForeground: '',
      selectedOptionBorder: '',
      standby: ''
    },
    fonts: {
      body: '', 
    },
    radii: {
      actionButton: '',
      connectButton: '',
      menuButton: '',
      modal: '',
      modalMobile: ''
    },
    shadows: {
      connectButton: '',
      dialog: '',
      profileDetailsAction: '',
      selectedOption: '',
      selectedWallet: '',
      walletLogo: ''
    },
    blurs: {
      modalOverlay: '' // Add the missing blurs property value
      // ... other blur properties
    }
  };

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider theme={myCustomTheme} chains={chains}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
