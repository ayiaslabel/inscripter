import * as React from "react";

import '../../global.css';
import '@rainbow-me/rainbowkit/styles.css';

import Head from 'next/head';
import Header from '../components/Header';

import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';


export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{backgroundColor: "black", zoom: "80%"}}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Analytics />
        <div>
          <Providers>
            <div style={{marginTop:"6%"}}>
              {children}
            </div>
            <Header/>
          </Providers>
        </div>
      </body>
    </html>
  );
}
  