import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { Open_Sans } from 'next/font/google';

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
