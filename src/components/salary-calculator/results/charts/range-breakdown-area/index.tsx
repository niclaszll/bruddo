'use client';

import { FormState } from '@/components/salary-calculator/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { TranslationKey } from '@/types/i18n';
import { useFormatter, useTranslations } from 'next-intl';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
} satisfies ChartConfig;

export function RangeBreakdownAreaChart({ results }: Props) {
  const formatCurrency = useFormatCurrency();
  const format = useFormatter();
  const t = useTranslations();

  if (!results.employeeResultsRange || !results.userInputs) return null;

  const calculationPeriod =
    results.userInputs?.calculationPeriod === CalculationPeriod.enum.MONTH
      ? CalculationPeriod.enum.MONTH
      : CalculationPeriod.enum.YEAR;

  // Transform data for the chart
  const chartData = results.employeeResultsRange.map((item) => ({
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gross Income Composition</CardTitle>
        <CardDescription>
          Stacked area chart showing the composition of gross income.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-80 w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            stackOffset="expand"
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="grossIncome"
              tickLine={true}
              axisLine={false}
              tickMargin={12}
              domain={[0, 'dataMax']}
              interval={15}
              tickFormatter={(value) =>
                formatCurrency(Math.round(value) as number, { maximumFractionDigits: 0 }) ??
                (value as string)
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => format.number(value, { style: 'percent' })}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.entries(chartConfig)
              .reverse()
              .map(([key, { label, color }]) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={color}
                  fillOpacity={0.5}
                  stroke={color}
                  stackId="a"
                  name={t(label as TranslationKey)}
                />
              ))}
            <ChartTooltip
              cursor={{ stroke: '#29BDAD', strokeDasharray: 5, z: 1000 }}
              content={
                <ChartTooltipContent
                  hideLabel
                  titleFormatter={(payload) =>
                    `${t('Results.employeeResults.grossIncome.short')}: ${formatCurrency(
                      payload[0].payload.grossIncome as number,
                      {
                        maximumFractionDigits: 0,
                      },
                    )}`
                  }
                  valueFormatter={(value) =>
                    formatCurrency(value as number, {
                      maximumFractionDigits: 0,
                    }) ?? (value as string)
                  }
                />
              }
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
