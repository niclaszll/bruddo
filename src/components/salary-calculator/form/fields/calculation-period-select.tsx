'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalculationPeriod } from '@/types/common';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const CALCULATION_PERIOD_OPTIONS = [CalculationPeriod.enum.YEAR, CalculationPeriod.enum.MONTH];

export default function CalculationPeriodSelect() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="calculationPeriod"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Abrechnungszeitraum</FormLabel>
          <div className="flex items-center gap-3">
            <PopoverTooltip>
              <p className="max-w-sm">
                Je nachdem ob Sie mit monatlichen oder jährlichen Werten rechnen, wählen Sie den
                jeweiligen Abrechnungszeitraum aus.
              </p>
            </PopoverTooltip>
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie den Abrechnungszeitraum" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CALCULATION_PERIOD_OPTIONS.map((key) => (
                  <SelectItem
                    key={key}
                    value={key}
                  >
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
