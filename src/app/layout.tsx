import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'SCRIPTS',
};

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
