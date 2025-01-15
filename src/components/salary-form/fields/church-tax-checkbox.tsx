'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

export default function ChurchTaxCheckbox() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="churchTax"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kirchensteuer</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Standardmäßig geht der Rechner davon aus, dass Kirchensteuer abzuführen ist
                    (Häkchen im Auswahlfeld bedeutet Kirchensteuer = Ja). Trifft dies nicht zu,
                    deaktivieren Sie dies bitte durch Klick auf das Auswahlfeld.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <FormControl>
              <Checkbox
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
