'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl } from '@/components/ui/form';

import { GenericField } from './shared';

const FIELD_NAME = 'nursingCareInsuranceSurcharge';

export default function NursingCareInsuranceSurchargeCheckbox() {
  return (
    <GenericField
      name={FIELD_NAME}
      className="pt-3 pb-1"
    >
      {(field) => (
        <FormControl>
          <Checkbox
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      )}
    </GenericField>
  );
}
