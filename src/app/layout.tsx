import * as React from "react";

import '../../global.css';
import Head from 'next/head';
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
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{ backgroundColor: 'black', color: 'white' }}>

        <Analytics />
        <div>
          <Providers>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', height: '100px' }}>
                <Header/>
              </div>
              <div style={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
                {children}
              </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}