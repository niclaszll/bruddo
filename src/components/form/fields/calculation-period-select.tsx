'use client';

import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalculationPeriod } from '@/types/common';
import { useTranslations } from 'next-intl';

import { GenericField } from './shared';

const CALCULATION_PERIOD_OPTIONS = [CalculationPeriod.enum.YEAR, CalculationPeriod.enum.MONTH];
const FIELD_NAME = 'calculationPeriod';

export default function CalculationPeriodSelect() {
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  return (
    <GenericField name={FIELD_NAME}>
      {(field) => (
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
      )}
    </GenericField>
  );
}
