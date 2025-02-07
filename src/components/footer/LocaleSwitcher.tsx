'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setUserLocale } from '@/lib/i18n/actions';
import { Locale } from '@/lib/i18n/config';
import { useLocale } from 'next-intl';
import { startTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <Select
      onValueChange={onChange}
      defaultValue={locale}
    >
      <SelectTrigger className="min-w-[80px] w-[80px] h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="de">DE</SelectItem>
          <SelectItem value="en">EN</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
