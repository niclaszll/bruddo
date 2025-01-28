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
import { TranslationKey } from '@/types/i18n';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  incomeTax: {
    label: 'Results.employeeResults.taxes.incomeTax' satisfies TranslationKey,
    color: 'hsl(var(--chart-1))',
  },
  solidaritySurcharge: {
    label: 'Results.employeeResults.taxes.solidaritySurcharge' satisfies TranslationKey,
    color: 'hsl(var(--chart-2))',
  },
  churchTax: {
    label: 'Results.employeeResults.taxes.churchTax' satisfies TranslationKey,
    color: 'hsl(var(--chart-3))',
  },
  healthInsurance: {
    label: 'Results.employeeResults.socialSecurity.healthInsurance' satisfies TranslationKey,
    color: 'hsl(var(--chart-4))',
  },
  nursingCareInsurance: {
    label: 'Results.employeeResults.socialSecurity.nursingCareInsurance' satisfies TranslationKey,
    color: 'hsl(var(--chart-5))',
  },
  pensionInsurance: {
    label: 'Results.employeeResults.socialSecurity.pensionInsurance' satisfies TranslationKey,
    color: 'hsl(var(--chart-6))',
  },
  unemploymentInsurance: {
    label: 'Results.employeeResults.socialSecurity.unemploymentInsurance' satisfies TranslationKey,
    color: 'hsl(var(--chart-7))',
  },
  netIncome: {
    label: 'Results.employeeResults.netIncome' satisfies TranslationKey,
    color: 'hsl(var(--chart-8))',
  },
} satisfies ChartConfig;

type Props = {
  results: FormState;
};

export function ContributionBreakdownStackedBarChart({ results }: Props) {
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();
  if (!results.employeeResults) return null;

  const chartData = [
    {
      category: 'Breakdown',
      incomeTax: results.employeeResults.taxes.incomeTax,
      solidaritySurcharge: results.employeeResults.taxes.solidaritySurcharge,
      churchTax: results.employeeResults.taxes.churchTax,
      healthInsurance: results.employeeResults.socialSecurity.healthInsurance,
      nursingCareInsurance: results.employeeResults.socialSecurity.nursingCareInsurance,
      pensionInsurance: results.employeeResults.socialSecurity.pensionInsurance,
      unemploymentInsurance: results.employeeResults.socialSecurity.unemploymentInsurance,
      netIncome: results.employeeResults.netIncome,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufschlüsselung Bruttogehalt</CardTitle>
        <CardDescription>
          Steuern, Sozialversicherungsbeiträge und verbleibendes Nettogehalt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            width={600}
            height={300}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              type="category"
              dataKey="category"
              tickLine={false}
              axisLine={false}
              hide
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              domain={[0, 'dataMax']}
              tickFormatter={(value) => `${value} €`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={(value) => formatCurrency(value as number) ?? (value as string)}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            {Object.entries(chartConfig).map(([key, { label, color }]) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={color}
                name={t(label as TranslationKey)}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
