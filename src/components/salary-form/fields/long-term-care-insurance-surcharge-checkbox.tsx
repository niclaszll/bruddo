'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

export default function LongTermCareInsuranceSurchargeCheckbox() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="longTermCareInsuranceSurcharge"
      render={({ field }) => (
        <FormItem>
          <FormLabel>PV Zuschlag</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Kinderlose Versicherte, die das 23. Lebensjahr vollendet haben, zahlen in der
                    Pflegeversicherung einen Beitragszuschlag, sofern sie gegenüber dem Arbeitgeber
                    keine Elterneigenschaft nachweisen. Dieser beträgt seit dem 1.7.2023: 0,6 %.
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
