'use client';

import { FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { GenericField } from './shared';

const FIELD_NAME = 'nursingCareInsuranceSurcharge';

export default function NursingCareInsuranceSurchargeSwitch() {
  return (
    <GenericField
      name={FIELD_NAME}
      className="py-1"
    >
      {(field) => (
        <FormControl>
          <Switch
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </FormControl>
      )}
    </GenericField>
  );
}
