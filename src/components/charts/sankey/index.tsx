'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { FormState } from '@/util/actions';
import { ResponsiveSankey } from '@nivo/sankey';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { memo } from 'react';

import { LinkTooltip, NodeTooltip } from './tooltips';

type Props = {
  results: FormState;
};

export const ContributionBreakdownSankeyChart = memo(function ContributionBreakdownSankeyChart({
  results,
}: Props) {
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();
  const { theme } = useTheme();

  const calculationPeriod =
    results.userInputs?.calculationPeriod === CalculationPeriod.enum.MONTH
      ? CalculationPeriod.enum.MONTH
      : CalculationPeriod.enum.YEAR;

  if (!results.employeeResults)
    return <Skeleton className="min-w-full h-[646px] lg:h-[630px] rounded-lg" />;

  const nodes = [
    { id: t('Results.employeeResults.grossIncome.short') },
    { id: t('Results.employeeResults.netIncome.short') },
    { id: t('Results.employeeResults.taxes.total.short') },
    { id: t('Results.employeeResults.taxes.incomeTax.short') },
    { id: t('Results.employeeResults.taxes.solidaritySurcharge.short') },
    { id: t('Results.employeeResults.taxes.churchTax.short') },
    { id: t('Results.employeeResults.socialSecurity.total.short') },
    { id: t('Results.employeeResults.socialSecurity.healthInsurance.short') },
    { id: t('Results.employeeResults.socialSecurity.nursingCareInsurance.short') },
    { id: t('Results.employeeResults.socialSecurity.pensionInsurance.short') },
    { id: t('Results.employeeResults.socialSecurity.unemploymentInsurance.short') },
  ];

  const links = [
    {
      source: t('Results.employeeResults.grossIncome.short'),
      target: t('Results.employeeResults.netIncome.short'),
      value: results.employeeResults.netIncome[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.grossIncome.short'),
      target: t('Results.employeeResults.taxes.total.short'),
      value: results.employeeResults.taxes.total[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.taxes.total.short'),
      target: t('Results.employeeResults.taxes.incomeTax.short'),
      value: results.employeeResults.taxes.incomeTax[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.taxes.total.short'),
      target: t('Results.employeeResults.taxes.solidaritySurcharge.short'),
      value: results.employeeResults.taxes.solidaritySurcharge[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.taxes.total.short'),
      target: t('Results.employeeResults.taxes.churchTax.short'),
      value: results.employeeResults.taxes.churchTax[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.grossIncome.short'),
      target: t('Results.employeeResults.socialSecurity.total.short'),
      value: results.employeeResults.socialSecurity.total[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.socialSecurity.total.short'),
      target: t('Results.employeeResults.socialSecurity.healthInsurance.short'),
      value: results.employeeResults.socialSecurity.healthInsurance[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.socialSecurity.total.short'),
      target: t('Results.employeeResults.socialSecurity.nursingCareInsurance.short'),
      value: results.employeeResults.socialSecurity.nursingCareInsurance[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.socialSecurity.total.short'),
      target: t('Results.employeeResults.socialSecurity.pensionInsurance.short'),
      value: results.employeeResults.socialSecurity.pensionInsurance[calculationPeriod],
    },
    {
      source: t('Results.employeeResults.socialSecurity.total.short'),
      target: t('Results.employeeResults.socialSecurity.unemploymentInsurance.short'),
      value: results.employeeResults.socialSecurity.unemploymentInsurance[calculationPeriod],
    },
  ];

  const sankeyTheme = {
    text: {
      fontWeight: 600,
      fontSize: 13,
      fontFamily: 'Open Sans, Open Sans Fallback',
    },
  };

  const sankeyColors = [
    'hsl(173, 58%, 39%)',
    'hsl(12, 76%, 61%)',
    'hsl(43, 74%, 66%)',
    'hsl(43, 74%, 66%)',
    'hsl(43, 74%, 66%)',
    'hsl(43, 74%, 66%)',
    'hsl(220, 57%, 50%)',
    'hsl(220, 57%, 50%)',
    'hsl(220, 57%, 50%)',
    'hsl(220, 57%, 50%)',
    'hsl(220, 57%, 50%)',
  ];

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>{t('Results.charts.sankey.title')}</CardTitle>
        <CardDescription>{t('Results.charts.sankey.description')}</CardDescription>
      </CardHeader>
      {results.employeeResults.grossIncome[calculationPeriod] > 0 && (
        <CardContent className="overflow-hidden">
          <div
            className="relative"
            style={{ height: 500 }}
          >
            <div className="w-full absolute top-0 left-0 bottom-0">
              <ResponsiveSankey
                theme={sankeyTheme}
                data={{ nodes, links }}
                margin={{ top: 10, right: 0, bottom: 10, left: 0 }}
                colors={sankeyColors}
                nodeOpacity={1}
                nodeHoverOpacity={1}
                nodeHoverOthersOpacity={0.35}
                nodeThickness={18}
                nodeSpacing={24}
                nodeBorderWidth={1}
                nodeTooltip={({ node }) => (
                  <NodeTooltip
                    grossIncome={results.employeeResults?.grossIncome[calculationPeriod]}
                    node={node}
                  />
                )}
                linkTooltip={({ link }) => (
                  <LinkTooltip
                    grossIncome={results.employeeResults?.grossIncome[calculationPeriod]}
                    link={link}
                  />
                )}
                linkOpacity={0.5}
                linkHoverOpacity={0.7}
                linkHoverOthersOpacity={0.1}
                linkContract={3}
                linkBlendMode="normal"
                labelPosition="inside"
                labelOrientation="horizontal"
                labelTextColor={{
                  from: 'color',
                  modifiers: [[theme === 'dark' ? 'brighter' : 'darker', 10]],
                }}
                valueFormat={(value) =>
                  formatCurrency(value as number, {
                    maximumFractionDigits: 0,
                  }) ?? value.toString()
                }
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
});
