import React from "react";
import {NextUIProvider} from '@nextui-org/react'
import {Progress} from "@nextui-org/react";

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
                <div className="flex flex-col gap-6 w-full max-w-md">
                  <Progress size="sm" aria-label="Loading..." value={30} />
                  <Progress size="md" value={40} />
                  <Progress size="lg" aria-label="Loading..." value={50} />
                </div> 
              </div>
              {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}