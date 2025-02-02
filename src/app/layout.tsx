import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { Open_Sans } from 'next/font/google';

import './globals.css';
import Provider from './provider';

// If loading a variable font, you don't need to specify the font weight
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Brutto Netto',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={openSans.className}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-foreground mb-6">
        <Provider
          locale={locale}
          messages={messages}
        >
          {children}
          <Toaster />
        </Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
