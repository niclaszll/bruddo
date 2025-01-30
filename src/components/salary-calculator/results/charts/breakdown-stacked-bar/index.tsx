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
import { Switch } from '@/components/ui/switch';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { TranslationKey } from '@/types/i18n';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfigDetailed = {
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

const chartConfigGeneral = {
  taxesTotal: {
    label: 'Results.employeeResults.taxes.total' satisfies TranslationKey,
    color: 'hsl(var(--chart-1))',
  },
  socialSecurityTotal: {
    label: 'Results.employeeResults.socialSecurity.total' satisfies TranslationKey,
    color: 'hsl(var(--chart-4))',
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
  const [isDetailedView, setIsDetailedView] = useState(true); // Toggle state
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();

  if (!results.employeeResults) return null;

  const calculationPeriod =
    results.userInputs?.calculationPeriod === CalculationPeriod.enum.MONTH
      ? CalculationPeriod.enum.MONTH
      : CalculationPeriod.enum.YEAR;

  // Prepare data based on the toggle state
  const chartData = isDetailedView
    ? [
        {
          category: 'Breakdown',
          incomeTax: results.employeeResults.taxes.incomeTax[calculationPeriod],
          solidaritySurcharge: results.employeeResults.taxes.solidaritySurcharge[calculationPeriod],
          churchTax: results.employeeResults.taxes.churchTax[calculationPeriod],
          healthInsurance:
            results.employeeResults.socialSecurity.healthInsurance[calculationPeriod],
          nursingCareInsurance:
            results.employeeResults.socialSecurity.nursingCareInsurance[calculationPeriod],
          pensionInsurance:
            results.employeeResults.socialSecurity.pensionInsurance[calculationPeriod],
          unemploymentInsurance:
            results.employeeResults.socialSecurity.unemploymentInsurance[calculationPeriod],
          netIncome: results.employeeResults.netIncome[calculationPeriod],
        },
      ]
    : [
        {
          category: 'Breakdown',
          taxesTotal: results.employeeResults.taxes.total[calculationPeriod],
          socialSecurityTotal: results.employeeResults.socialSecurity.total[calculationPeriod],
          netIncome: results.employeeResults.netIncome[calculationPeriod],
        },
      ];

  const chartConfig = isDetailedView ? chartConfigDetailed : chartConfigGeneral;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aufschlüsselung Bruttogehalt</CardTitle>
        <CardDescription>
          Steuern, Sozialversicherungsbeiträge und verbleibendes Nettogehalt
        </CardDescription>
        <div className="flex items-center pt-3">
          <span className="text-sm font-medium pr-4">Detaillierte Aufschlüsselung</span>
          <Switch
            checked={isDetailedView}
            onCheckedChange={() => setIsDetailedView((prev) => !prev)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
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
