'use client';

import { useTranslations } from 'next-intl';

import { Separator } from '../ui/separator';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Footer() {
  const t = useTranslations();

  return (
    <>
      <Separator />
      <div className="px-6 lg:px-6 py-6">
        <div className="flex gap-12 items-center justify-between">
          <p className="text-xs text-muted-foreground">{t('Footer.disclaimer')}</p>
          <LocaleSwitcher />
        </div>
      </div>
    </>
  );
}
