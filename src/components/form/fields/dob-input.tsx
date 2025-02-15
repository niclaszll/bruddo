'use client';

import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { GenericField } from './shared';

const FIELD_NAME = 'dob';

export default function DobInput() {
  return (
    <GenericField name={FIELD_NAME}>
      {(field) => (
        <FormControl className="w-full">
          <Input
            {...field}
            type="date"
            value={
              field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value
            }
          />
        </FormControl>
      )}
    </GenericField>
  );
}
