'use client';

import { FormState } from '@/components/form/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { GridColumns, GridRows } from '@visx/grid';
import { ParentSize } from '@visx/responsive';
import { scaleLinear } from '@visx/scale';
import { defaultStyles } from '@visx/tooltip';
import { AreaSeries, AreaStack, Axis, Tooltip, XYChart, buildChartTheme } from '@visx/xychart';
import { useFormatter, useTranslations } from 'next-intl';

import { chartConfig } from './config';
import { AreaChartTooltip } from './tooltip';

export type ChartDatum = {
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
                      renderTooltip={({ tooltipData }) => (
                        <AreaChartTooltip tooltipData={tooltipData} />
                      )}
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
