'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

type Props = {
  messages: AbstractIntlMessages;
  locale: string;
};

export default function Provider({
  messages,
  locale,
  children,
}: Readonly<React.PropsWithChildren<Props>>) {
  return (
    <NextIntlClientProvider
      messages={messages}
      locale={locale}
      timeZone="Europe/Berlin"
    >
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </NextIntlClientProvider>
  );
}
