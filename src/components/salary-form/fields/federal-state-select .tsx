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
import { FederalState } from '@/types/common';
import { useFormContext } from 'react-hook-form';

import { InfoIcon } from './shared';

const FEDERAL_STATE_OPTIONS = [
  FederalState.enum.BW,
  FederalState.enum.BY,
  FederalState.enum.BE,
  FederalState.enum.BB,
  FederalState.enum.HB,
  FederalState.enum.HH,
  FederalState.enum.HE,
  FederalState.enum.NI,
  FederalState.enum.MV,
  FederalState.enum.NW,
  FederalState.enum.RP,
  FederalState.enum.SL,
  FederalState.enum.SN,
  FederalState.enum.ST,
  FederalState.enum.SH,
  FederalState.enum.TH,
];

export default function FederalStateSelect() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="federalState"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bundesland</FormLabel>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm">
                    Wählen Sie hier das jeweilige Bundesland aus, in dem der Arbeitnehmer seinen
                    Beschäftigungsort hat (nicht zu verwechseln mit der Betriebsstätte im
                    steuerrechtlichen Sinn).
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
                  <SelectValue placeholder="Wählen Sie Ihr Bundesland" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {FEDERAL_STATE_OPTIONS.map((key) => (
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
