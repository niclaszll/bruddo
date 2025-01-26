'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

export default function NursingCareInsuranceSurchargeCheckbox() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="nursingCareInsuranceSurcharge"
      render={({ field }) => (
        <FormItem>
          <FormLabel>PV Zuschlag</FormLabel>
          <div className="flex items-center gap-3 pt-3 pb-2">
            <PopoverTooltip>
              <p className="max-w-sm">
                Kinderlose Versicherte, die das 23. Lebensjahr vollendet haben, zahlen in der
                Pflegeversicherung einen Beitragszuschlag, sofern sie gegenüber dem Arbeitgeber
                keine Elterneigenschaft nachweisen. Dieser beträgt seit dem 1.7.2023: 0,6 %.
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
