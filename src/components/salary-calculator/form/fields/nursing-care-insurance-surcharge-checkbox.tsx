'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const FIELD_NAME = 'nursingCareInsuranceSurcharge';

export default function NursingCareInsuranceSurchargeCheckbox() {
  const form = useFormContext();
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  return (
    <FormField
      control={form.control}
      name={FIELD_NAME}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md md:text-sm">{t('label')}</FormLabel>
          <div className="flex items-center gap-3 pt-3 pb-1 max-md:pt-2">
            <PopoverTooltip>
              <p className="max-w-sm">{t('tooltip')}</p>
            </PopoverTooltip>
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
