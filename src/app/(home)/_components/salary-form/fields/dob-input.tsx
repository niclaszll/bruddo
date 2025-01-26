'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

export default function DobInput() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Geburtsdatum</FormLabel>
          <div className="flex items-center gap-2">
            <PopoverTooltip>
              <p className="max-w-sm">
                Arbeitnehmer über 64 Jahre erhalten den Altersentlastungsbetrag nach § 24a EStG. Die
                Höhe des Altersentlastungsbetrags ist abhängig von den Einkünften und vom
                Kalenderjahr, das auf den 64. Geburtstag des Arbeitnehmers folgt.
              </p>
            </PopoverTooltip>
            <FormControl>
              <Input
                {...field}
                type="date"
                value={
                  field.value instanceof Date
                    ? field.value.toISOString().split('T')[0]
                    : field.value
                }
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
