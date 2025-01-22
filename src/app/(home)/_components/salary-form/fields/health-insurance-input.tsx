'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

export default function HealthInsuranceAddConInput() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="healthInsuranceAdditionalContribution"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Zusatzbeitrag</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">Der Zusatzbeitrag Ihrer Krankenkasse.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <FormControl>
              <Input
                {...field}
                type="number"
                step="0.01"
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
