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
import { useFormContext } from 'react-hook-form';

import { GenericField } from './shared';

const NUMBER_OF_CHILDREN_OPTIONS = [0, 1, 2, 3, 4, 5];
const FIELD_NAME = 'numChildren';

export default function NumberOfChildrenSelect() {
  const form = useFormContext();
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);

  const isDisabled = form.watch('nursingCareInsuranceSurcharge');

  return (
    <GenericField name={FIELD_NAME}>
      {(field) => (
        <Select
          {...field}
          onValueChange={field.onChange}
          value={(field.value as number).toString()}
          disabled={isDisabled}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={t('label')} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {NUMBER_OF_CHILDREN_OPTIONS.map((key) => (
              <SelectItem
                key={key}
                value={key.toString()}
              >
                {t(`options.${key.toString() as '0' | '1' | '2' | '3' | '4' | '5'}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </GenericField>
  );
}
