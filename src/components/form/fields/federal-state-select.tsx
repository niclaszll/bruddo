'use client';

import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FederalState } from '@/types/common';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { GenericField } from './shared';

const FEDERAL_STATE_OPTIONS = [
  { key: FederalState.enum.BW },
  { key: FederalState.enum.BY },
  { key: FederalState.enum.BE },
  { key: FederalState.enum.BB },
  { key: FederalState.enum.HB },
  { key: FederalState.enum.HH },
  { key: FederalState.enum.HE },
  { key: FederalState.enum.MV },
  { key: FederalState.enum.NI },
  { key: FederalState.enum.NW },
  { key: FederalState.enum.RP },
  { key: FederalState.enum.SL },
  { key: FederalState.enum.SN },
  { key: FederalState.enum.ST },
  { key: FederalState.enum.SH },
  { key: FederalState.enum.TH },
];

const FIELD_NAME = 'federalState';

export default function FederalStateSelect() {
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
            {FEDERAL_STATE_OPTIONS.map(({ key }) => (
              <SelectItem
                key={key}
                value={key}
              >
                <div className="flex items-center">
                  <Image
                    src={`/federal-states/${key}.svg`}
                    alt={t('label')}
                    width={3}
                    height={3}
                    className="w-4 mr-2 object-cover"
                  />
                  <span className="truncate">{t(`options.${key}`)}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </GenericField>
  );
}
