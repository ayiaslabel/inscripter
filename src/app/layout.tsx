import '../../global.css';
import React from 'react';
import Header from '../components/Header';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ backgroundColor: 'black', color: 'white' }}>

        <Analytics />
        <div>
          <Providers>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', height: '100px' }}>
              <Header/>
            </div>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}