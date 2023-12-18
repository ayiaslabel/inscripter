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
        <header> {/* Add a <header> element here */}
          <Header />
        </header>
        <Analytics />
        <div>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}