'use client';

import BB from '@/assets/federal-states/BB.svg';
import BE from '@/assets/federal-states/BE.svg';
import BW from '@/assets/federal-states/BW.svg';
import BY from '@/assets/federal-states/BY.svg';
import HB from '@/assets/federal-states/HB.svg';
import HE from '@/assets/federal-states/HE.svg';
import HH from '@/assets/federal-states/HH.svg';
import MV from '@/assets/federal-states/MV.svg';
import NI from '@/assets/federal-states/NI.svg';
import NW from '@/assets/federal-states/NW.svg';
import RP from '@/assets/federal-states/RP.svg';
import SH from '@/assets/federal-states/SH.svg';
import SL from '@/assets/federal-states/SL.svg';
import SN from '@/assets/federal-states/SN.svg';
import ST from '@/assets/federal-states/ST.svg';
import TH from '@/assets/federal-states/TH.svg';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FederalState } from '@/types/common';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

import { PopoverTooltip } from './shared';

const FEDERAL_STATE_OPTIONS = [
  { key: FederalState.enum.BW, icon: BW },
  { key: FederalState.enum.BY, icon: BY },
  { key: FederalState.enum.BE, icon: BE },
  { key: FederalState.enum.BB, icon: BB },
  { key: FederalState.enum.HB, icon: HB },
  { key: FederalState.enum.HH, icon: HH },
  { key: FederalState.enum.HE, icon: HE },
  { key: FederalState.enum.MV, icon: MV },
  { key: FederalState.enum.NI, icon: NI },
  { key: FederalState.enum.NW, icon: NW },
  { key: FederalState.enum.RP, icon: RP },
  { key: FederalState.enum.SL, icon: SL },
  { key: FederalState.enum.SN, icon: SN },
  { key: FederalState.enum.ST, icon: ST },
  { key: FederalState.enum.SH, icon: SH },
  { key: FederalState.enum.TH, icon: TH },
];

const FIELD_NAME = 'federalState';

export default function FederalStateSelect() {
  const t = useTranslations(`SalaryCalculator.form.fields.${FIELD_NAME}`);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={FIELD_NAME}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md md:text-sm">{t('label')}</FormLabel>
          <div className="flex items-center gap-3 max-md:pt-2">
            <PopoverTooltip>
              <p className="max-w-sm">{t('tooltip')}</p>
            </PopoverTooltip>
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('label')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {FEDERAL_STATE_OPTIONS.map(({ key, icon }) => (
                  <SelectItem
                    key={key}
                    value={key}
                  >
                    <div className="flex items-center">
                      <Image
                        src={icon}
                        alt={t('label')}
                        className="w-4 mr-2 object-cover"
                      />
                      <span className="truncate">{t(`options.${key}`)}</span>
                    </div>
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
