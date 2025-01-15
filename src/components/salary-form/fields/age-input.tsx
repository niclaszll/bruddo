'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

export default function AgeInput() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="age"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Alter</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Arbeitnehmer über 64 Jahre erhalten den Altersentlastungsbetrag nach § 24a EStG.
                    Die Höhe des Altersentlastungsbetrags ist abhängig von den Einkünften und vom
                    Kalenderjahr, das auf den 64. Geburtstag des Arbeitnehmers folgt.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <FormControl>
              <Input
                {...field}
                type="number"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
