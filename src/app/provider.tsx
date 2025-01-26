'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
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
    >
      {children}
    </NextIntlClientProvider>
  );
}
