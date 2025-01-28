'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { defaultValues } from '..';
import { PopoverTooltip } from './shared';

const numberFormatter = Intl.NumberFormat('de-DE', {
  style: 'decimal',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const FIELD_NAME = 'healthInsuranceAdditionalContribution';

export default function HealthInsuranceAddConInput() {
  const form = useFormContext();
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  const [value, setValue] = React.useReducer(
    (_: string, next: string) => {
      const digits = next.replace(/\D/g, '');
      return numberFormatter.format(Number(digits) / 100).trim();
    },
    numberFormatter.format(Number(defaultValues[FIELD_NAME])).trim(),
  );

  function handleChange(formattedValue: string, onCallback: (value: number) => void) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    onCallback(realValue);
  }

  return (
    <FormField
      control={form.control}
      name={FIELD_NAME}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('label')}</FormLabel>
          <div className="flex items-center gap-3">
            <PopoverTooltip>
              <p className="max-w-sm">{t('tooltip')}</p>
            </PopoverTooltip>
            <FormControl>
              <div className="relative">
                <span className="absolute -inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 dark:text-gray-400">
                  %
                </span>
                <Input
                  {...field}
                  type="string"
                  className="pr-7 text-right"
                  value={value}
                  onChange={(ev) => {
                    setValue(ev.target.value);
                    handleChange(ev.target.value, field.onChange);
                  }}
                />
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
