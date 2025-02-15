'use client';

import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

import { GenericField } from './shared';

const CHILD_ALLOWANCES_OPTIONS = [...Array(20).keys()].map((i) => i * 0.5);
const FIELD_NAME = 'childAllowances';

export default function ChildAllowancesSelect() {
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  return (
    <GenericField name={FIELD_NAME}>
      {(field) => (
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
      )}
    </GenericField>
  );
}
