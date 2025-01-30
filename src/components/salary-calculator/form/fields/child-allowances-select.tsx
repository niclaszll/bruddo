'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const CHILD_ALLOWANCES_OPTIONS = [...Array(20).keys()].map((i) => i * 0.5);
const FIELD_NAME = 'childAllowances';

export default function ChildAllowancesSelect() {
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
              value={(field.value as number).toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('label')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CHILD_ALLOWANCES_OPTIONS.map((key) => (
                  <SelectItem
                    key={key}
                    value={key.toString()}
                  >
                    {key.toString()}
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
