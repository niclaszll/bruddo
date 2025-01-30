'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalculationPeriod } from '@/types/common';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const CALCULATION_PERIOD_OPTIONS = [CalculationPeriod.enum.YEAR, CalculationPeriod.enum.MONTH];
const FIELD_NAME = 'calculationPeriod';

export default function CalculationPeriodSelect() {
  const form = useFormContext();
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  return (
    <FormField
      control={form.control}
      name={FIELD_NAME}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md md:text-sm">{t('label')}</FormLabel>
          <div className="flex items-center gap-3 max-md:pt-2">
            <PopoverTooltip>
              <p className="max-w-sm">{t('tooltip')}</p>
            </PopoverTooltip>
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('label')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CALCULATION_PERIOD_OPTIONS.map((key) => (
                  <SelectItem
                    key={key}
                    value={key}
                  >
                    {t(`options.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
