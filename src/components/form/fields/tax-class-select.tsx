'use client';

import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaxClass } from '@/types/common';
import { useTranslations } from 'next-intl';

import { GenericField } from './shared';

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
      )}
    </GenericField>
  );
}
