import { Toaster } from '@/components/ui/toaster';
import { NODE_ENV } from '@/util/environment';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { Open_Sans } from 'next/font/google';
import Script from 'next/script';

import './globals.css';
import Provider from './provider';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: 'Bruddo - Brutto-Netto Rechner',
  description: 'German salary calculator - Calculate your net income from gross salary',
  keywords: ['salary calculator', 'German taxes', 'net income', 'gross income'],
  authors: [{ name: 'Bruddo' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html
      lang={locale}
      className={openSans.className}
      suppressHydrationWarning
    >
      {NODE_ENV === 'production' && (
        <Script
          defer
          src="/stats/script.js"
          data-website-id="e435012f-386d-4d7e-b6f7-0ec7e156a426"
        />
      )}
      <body className="antialiased bg-background text-foreground min-h-screen">
        <Provider
          locale={locale}
          messages={messages}
        >
          <main>{children}</main>
          <Toaster />
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
