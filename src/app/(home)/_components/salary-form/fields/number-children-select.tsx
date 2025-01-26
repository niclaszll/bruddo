'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

const NUMBER_OF_CHILDREN_OPTIONS = [0, 1, 2, 3, 4, 5];

export default function NumberOfChildrenSelect() {
  const form = useFormContext();

  const isDisabled = form.watch('nursingCareInsuranceSurcharge');

  return (
    <FormField
      control={form.control}
      name="numChildren"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Anzahl Kinder</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Tragen Sie hier die Anzahl der berücksichtigungsfähigen Kinder für die
                    Pflegeversicherung ein, um Beitragsabschläge zu berücksichtigen.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Select
              {...field}
              onValueChange={field.onChange}
              value={(field.value as number).toString()}
              disabled={isDisabled}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Anzahl Ihrer Kinder" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {NUMBER_OF_CHILDREN_OPTIONS.map((key) => (
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
