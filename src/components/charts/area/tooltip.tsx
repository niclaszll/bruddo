import { useFormatCurrency } from '@/hooks/common';
import { TranslationKey } from '@/types/i18n';
import { cn } from '@/util/tailwind';
import { TooltipData } from '@visx/xychart';
import { useFormatter, useTranslations } from 'next-intl';

import { ChartDatum } from '.';
import { chartConfig } from './config';

type Props = {
  tooltipData?: TooltipData<object> | undefined;
};

export function AreaChartTooltip({ tooltipData }: Props) {
  const formatCurrency = useFormatCurrency();
  const format = useFormatter();
  const t = useTranslations();

  const datum = tooltipData?.nearestDatum?.datum as ChartDatum | undefined;
  if (!datum) return null;

  return (
    <div className="rounded-md bg-secondary px-4 py-3 text-sm text-foreground shadow-md">
      <p className="flex justify-between gap-2 mb-1">
        <span className="mr-1 font-bold">{t('Results.employeeResults.grossIncome.short')}: </span>
        <span className="font-bold">
          {formatCurrency(datum.grossIncome, { maximumFractionDigits: 0 })}
        </span>
      </p>
      {Object.entries(chartConfig).map(([key, { label, color }]) => (
        <div
          key={key}
          className="flex items-center gap-2"
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="w-full flex gap-2 justify-between">
            <span className="font-semibold mr-1">{t(label as TranslationKey)}:</span>
            <div className="flex gap-2">
              <span
                className={cn(
                  key === 'netIncome' &&
                    'font-bold underline underline-offset-4 decoration-2 decoration-primary',
                )}
              >
                {formatCurrency(datum[key as keyof typeof datum] as number, {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className={cn('text-muted-foreground', key === 'netIncome' && 'font-bold')}>
                (
                {format.number(datum[key as keyof typeof datum] / datum.grossIncome, {
                  style: 'percent',
                })}
                )
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
