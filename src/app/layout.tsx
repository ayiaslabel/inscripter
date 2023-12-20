import * as React from "react";

import '../../global.css';
import '@rainbow-me/rainbowkit/styles.css';

import Head from 'next/head';
import Header from '../components/Header';

import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

import { ConnectButton } from '../components/ConnectButton';


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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', marginLeft: '26%'}}> {/* 이 부분에 닫는 괄호 추가 */}
              <ConnectButton />
            </div> 
        {/* 이 부분이 ConnectButton과 관련된 div의 끝인 것 같습니다. */}   
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', backgroundColor: 'black', color: 'white'}}>
                {children}
              </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}