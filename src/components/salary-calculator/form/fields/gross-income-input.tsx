'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { defaultValues } from '..';
import { PopoverTooltip } from './shared';

const moneyFormatter = Intl.NumberFormat('de-DE', {
  currency: 'EUR',
  currencyDisplay: 'symbol',
  currencySign: undefined,
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function GrossIncomeInput() {
  const form = useFormContext();

  const [value, setValue] = React.useReducer(
    (_: string, next: string) => {
      const digits = next.replace(/\D/g, '');
      return moneyFormatter
        .format(Number(digits) / 100)
        .replace('€', '')
        .trim();
    },
    moneyFormatter.format(Number(defaultValues.grossIncome)).replace('€', '').trim(),
  );

  function handleChange(formattedValue: string, onCallback: (value: number) => void) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    onCallback(realValue);
  }

  return (
    <FormField
      control={form.control}
      name="grossIncome"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bruttogehalt</FormLabel>
          <div className="flex items-center gap-3">
            <PopoverTooltip>
              <p className="max-w-sm">Ihr Bruttogehalt im Abrechnungszeitraum.</p>
            </PopoverTooltip>
            <FormControl>
              <div className="relative">
                <span className="absolute -inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 dark:text-gray-400">
                  €
                </span>
                <Input
                  {...field}
                  className="pr-6 text-right"
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
