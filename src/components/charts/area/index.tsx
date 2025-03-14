'use client';

import { FormState } from '@/components/form/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { TranslationKey } from '@/types/i18n';
import { cn } from '@/util/tailwind';
import { GridColumns, GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { scaleLinear } from '@visx/scale';
import { defaultStyles } from '@visx/tooltip';
import { AreaSeries, AreaStack, Axis, Tooltip, XYChart, buildChartTheme } from '@visx/xychart';
import { useFormatter, useTranslations } from 'next-intl';

type ChartDatum = {
  grossIncome: number;
  netIncome: number;
  incomeTax: number;
  solidaritySurcharge: number;
  churchTax: number;
  healthInsurance: number;
  nursingCareInsurance: number;
  pensionInsurance: number;
  unemploymentInsurance: number;
};

type Props = {
  results: FormState;
};

const chartConfig = {
  incomeTax: {
    label: 'Results.employeeResults.taxes.incomeTax.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-1))',
  },
  solidaritySurcharge: {
    label: 'Results.employeeResults.taxes.solidaritySurcharge.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-2))',
  },
  churchTax: {
    label: 'Results.employeeResults.taxes.churchTax.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-3))',
  },
  healthInsurance: {
    label: 'Results.employeeResults.socialSecurity.healthInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-4))',
  },
  nursingCareInsurance: {
    label:
      'Results.employeeResults.socialSecurity.nursingCareInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-5))',
  },
  pensionInsurance: {
    label: 'Results.employeeResults.socialSecurity.pensionInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-6))',
  },
  unemploymentInsurance: {
    label:
      'Results.employeeResults.socialSecurity.unemploymentInsurance.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-7))',
  },
  netIncome: {
    label: 'Results.employeeResults.netIncome.short' satisfies TranslationKey,
    color: 'hsl(var(--chart-8))',
  },
};

export function RangeBreakdownAreaChart({ results }: Props) {
  const formatCurrency = useFormatCurrency();
  const format = useFormatter();
  const t = useTranslations();

  if (!results.employeeResultsRange || !results.userInputs) return null;

  const calculationPeriod =
    results.userInputs?.calculationPeriod === CalculationPeriod.enum.MONTH
      ? CalculationPeriod.enum.MONTH
      : CalculationPeriod.enum.YEAR;

  const chartData: ChartDatum[] = results.employeeResultsRange.map((item) => ({
    grossIncome: item.grossIncome[calculationPeriod],
    netIncome: item.netIncome[calculationPeriod],
    incomeTax: item.taxes.incomeTax[calculationPeriod],
    solidaritySurcharge: item.taxes.solidaritySurcharge[calculationPeriod],
    churchTax: item.taxes.churchTax[calculationPeriod],
    healthInsurance: item.socialSecurity.healthInsurance[calculationPeriod],
    nursingCareInsurance: item.socialSecurity.nursingCareInsurance[calculationPeriod],
    pensionInsurance: item.socialSecurity.pensionInsurance[calculationPeriod],
    unemploymentInsurance: item.socialSecurity.unemploymentInsurance[calculationPeriod],
  }));

  const customTheme = buildChartTheme({
    backgroundColor: 'transparent',
    colors: Object.values(chartConfig).map(({ color }) => color),
    gridColor: 'var(--border)',
    gridColorDark: 'var(--border)',
    tickLength: 4,
  });

  const margin = { right: 0, top: 10, left: 50, bottom: 20 };

  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{t('Results.charts.area.title')}</CardTitle>
        <CardDescription>{t('Results.charts.area.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[350px]">
          <div className="w-full absolute top-0 left-0 bottom-0">
            <div className="h-80 w-full">
              <ParentSize>
                {({ width, height }) => (
                  <XYChart
                    theme={customTheme}
                    width={width}
                    height={350}
                    xScale={{
                      type: 'linear',
                      zero: false,
                    }}
                    yScale={{ type: 'linear', domain: [0, 1] }}
                    margin={margin}
                  >
                    <GridRows
                      left={margin.left}
                      scale={scaleLinear({
                        zero: false,
                        range: [height + margin.top, margin.top],
                      })}
                      width={width}
                      strokeDasharray="1,3"
                      strokeOpacity="1"
                      pointerEvents="none"
                    />
                    <GridColumns
                      top={margin.top}
                      scale={scaleLinear({
                        zero: false,
                        range: [margin.left, width],
                      })}
                      height={height}
                      strokeDasharray="1,3"
                      strokeOpacity="1"
                      pointerEvents="none"
                    />
                    {['mobile', 'desktop'].map((value) => (
                      <Axis
                        key={value}
                        tickClassName={value === 'mobile' ? 'block md:hidden' : 'hidden md:block'}
                        orientation="bottom"
                        tickFormat={(value) =>
                          formatCurrency(Math.round(value as number), {
                            notation: 'compact',
                            compactDisplay: 'short',
                            maximumFractionDigits: 1,
                          }) ?? (value as string)
                        }
                        tickLabelProps={(_value, index, ticks) => {
                          // hide last tick to prevent clipping
                          if (index === ticks.length - 1) {
                            return { display: 'none' };
                          }
                          return {
                            textAnchor: 'middle',
                            dominantBaseline: 'middle',
                          };
                        }}
                        numTicks={
                          value === 'mobile'
                            ? 3
                            : results.employeeResults.grossIncome[calculationPeriod] < 10000
                              ? 5
                              : 8
                        }
                      />
                    ))}
                    <Axis
                      orientation="left"
                      tickFormat={(value) => format.number(value as number, { style: 'percent' })}
                      numTicks={4}
                    />
                    <AreaStack offset="expand">
                      {Object.entries(chartConfig)
                        .reverse()
                        .map(([key, { color }]) => (
                          <AreaSeries
                            key={key}
                            dataKey={key}
                            data={chartData}
                            fill={color}
                            fillOpacity={0.8}
                            stroke={color}
                            strokeWidth={1}
                            xAccessor={(d) => d.grossIncome}
                            yAccessor={(d) => d[key as keyof typeof d]}
                          />
                        ))}
                    </AreaStack>
                    <Tooltip
                      snapTooltipToDatumX
                      snapTooltipToDatumY
                      showSeriesGlyphs
                      showHorizontalCrosshair
                      verticalCrosshairStyle={{
                        stroke: '#fff',
                        strokeWidth: 1,
                        strokeDasharray: '5,5',
                      }}
                      horizontalCrosshairStyle={{
                        stroke: '#fff',
                        strokeWidth: 1,
                        strokeDasharray: '5,5',
                      }}
                      style={{
                        ...defaultStyles,
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                      }}
                      showVerticalCrosshair
                      renderTooltip={({ tooltipData }) => {
                        const datum = tooltipData?.nearestDatum?.datum as ChartDatum | undefined;
                        if (!datum) return null;

                        return (
                          <div className="rounded-md bg-secondary px-4 py-3 text-sm text-foreground shadow-md">
                            <p className="flex justify-between gap-2 mb-1">
                              <span className="mr-1 font-bold">
                                {t('Results.employeeResults.grossIncome.short')}:{' '}
                              </span>
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
                                  <span className="font-semibold mr-1">
                                    {t(label as TranslationKey)}:
                                  </span>
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
                                    <span
                                      className={cn(
                                        'text-muted-foreground',
                                        key === 'netIncome' && 'font-bold',
                                      )}
                                    >
                                      (
                                      {format.number(
                                        datum[key as keyof typeof datum] / datum.grossIncome,
                                        { style: 'percent' },
                                      )}
                                      )
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }}
                    />
                  </XYChart>
                )}
              </ParentSize>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
