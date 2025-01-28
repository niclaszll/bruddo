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
// Adjust the import path as needed
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  incomeTax: {
    label: 'Income Tax',
    color: 'hsl(var(--chart-1))',
  },
  solidaritySurcharge: {
    label: 'Solidarity Surcharge',
    color: 'hsl(var(--chart-2))',
  },
  churchTax: {
    label: 'Church Tax',
    color: 'hsl(var(--chart-3))',
  },
  healthInsurance: {
    label: 'Health Insurance',
    color: 'hsl(var(--chart-4))',
  },
  nursingCareInsurance: {
    label: 'Nursing Care Insurance',
    color: 'hsl(var(--chart-5))',
  },
  pensionInsurance: {
    label: 'Pension Insurance',
    color: 'hsl(var(--chart-6))',
  },
  unemploymentInsurance: {
    label: 'Unemployment Insurance',
    color: 'hsl(var(--chart-7))',
  },
  netIncome: {
    label: 'Net Income',
    color: 'hsl(var(--chart-8))',
  },
} satisfies ChartConfig;

type Props = {
  results: FormState;
};

export function ContributionBreakdownStackedBarChart({ results }: Props) {
  if (!results.employeeResults) return null;

  // Prepare data for the stacked bar chart
  const chartData = [
    {
      category: 'Breakdown', // Single bar
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
        <CardTitle>Bruttogehalt Aufschlüsselung</CardTitle>
        <CardDescription>
          Aufschlüsselung in Steuern, Sozialversicherungsbeiträge und verbleibendem Nettogehalt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical" // Vertical orientation for a single bar
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
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            {/* Add each component as a stacked segment */}
            <Bar
              dataKey="incomeTax"
              stackId="a"
              fill="var(--color-incomeTax)"
            />
            <Bar
              dataKey="solidaritySurcharge"
              stackId="a"
              fill="var(--color-solidaritySurcharge)"
            />
            <Bar
              dataKey="churchTax"
              stackId="a"
              fill="var(--color-churchTax)"
            />
            <Bar
              dataKey="healthInsurance"
              stackId="a"
              fill="var(--color-healthInsurance)"
            />
            <Bar
              dataKey="nursingCareInsurance"
              stackId="a"
              fill="var(--color-nursingCareInsurance)"
            />
            <Bar
              dataKey="pensionInsurance"
              stackId="a"
              fill="var(--color-pensionInsurance)"
            />
            <Bar
              dataKey="unemploymentInsurance"
              stackId="a"
              fill="var(--color-unemploymentInsurance)"
            />
            <Bar
              dataKey="netIncome"
              stackId="a"
              fill="var(--color-netIncome)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Total Gross Income Breakdown</div>
        <div className="leading-none text-muted-foreground">
          Showing how gross income is distributed across taxes and contributions.
        </div>
      </CardFooter> */}
    </Card>
  );
}
