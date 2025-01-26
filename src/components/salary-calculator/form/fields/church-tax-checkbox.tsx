'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

export default function ChurchTaxCheckbox() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="churchTax"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kirchensteuer</FormLabel>
          <div className="flex items-center gap-3 pt-3 pb-2">
            <PopoverTooltip>
              <p className="max-w-sm">
                Standardmäßig geht der Rechner davon aus, dass Kirchensteuer abzuführen ist (Häkchen
                im Auswahlfeld bedeutet Kirchensteuer = Ja). Trifft dies nicht zu, deaktivieren Sie
                dies bitte durch Klick auf das Auswahlfeld.
              </p>
            </PopoverTooltip>
            <FormControl>
              <Checkbox
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
