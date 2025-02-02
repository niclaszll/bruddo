'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const FIELD_NAME = 'dob';

export default function DobInput() {
  const form = useFormContext();
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  return (
    <FormField
      control={form.control}
      name={FIELD_NAME}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md md:text-sm">{t('label')}</FormLabel>
          <div className="flex items-center gap-3">
            <PopoverTooltip>
              <p className="max-w-sm">{t('tooltip')}</p>
            </PopoverTooltip>
            <FormControl className="w-full">
              <Input
                {...field}
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split('T')[0]
                    : field.value
                }
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
