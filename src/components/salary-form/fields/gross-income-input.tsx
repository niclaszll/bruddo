'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

export default function GrossIncomeInput() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="grossIncome"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bruttogehalt</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">Ihr Bruttogehalt im Abrechnungszeitraum.</p>
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
