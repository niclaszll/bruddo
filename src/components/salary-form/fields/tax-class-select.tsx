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
import { TaxClass } from '@/types/common';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

const TAX_CLASS_OPTIONS = [
  TaxClass.enum.I,
  TaxClass.enum.II,
  TaxClass.enum.III,
  TaxClass.enum.IV,
  TaxClass.enum.V,
  TaxClass.enum.VI,
];

export default function TaxClassSelect() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="taxClass"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Steuerklasse</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Wählen Sie die zutreffende Steuerklasse laut den ELStAM aus.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie Ihre Steuerklasse" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TAX_CLASS_OPTIONS.map((key) => (
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
