'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const CHILD_ALLOWANCES_OPTIONS = [...Array(20).keys()].map((i) => i * 0.5);

export default function ChildAllowancesSelect() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="childAllowances"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kinderfreibeträge</FormLabel>
          <div className="flex items-center gap-3">
            <PopoverTooltip>
              <p className="max-w-sm">
                Wählen Sie hier die zu berücksichtigenden Kinder laut der ELStAM anhand des sog.
                Kinderfreibetragszählers aus. Der Freibetrag wird bei der Steuer-Ermittlung von ggf.
                Solidaritätszuschlag und Kirchensteuer berücksichtigt.
              </p>
            </PopoverTooltip>
            <Select
              {...field}
              onValueChange={field.onChange}
              value={(field.value as number).toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Anzahl der Kinderfreibeträge" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {CHILD_ALLOWANCES_OPTIONS.map((key) => (
                  <SelectItem
                    key={key}
                    value={key.toString()}
                  >
                    {key.toString()}
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
