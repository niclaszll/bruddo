'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaxClass } from '@/types/common';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const TAX_CLASS_OPTIONS = [
  TaxClass.enum.I,
  TaxClass.enum.II,
  TaxClass.enum.III,
  TaxClass.enum.IV,
  TaxClass.enum.V,
  TaxClass.enum.VI,
];

const FIELD_NAME = 'taxClass';

export default function TaxClassSelect() {
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
                {TAX_CLASS_OPTIONS.map((key) => (
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
