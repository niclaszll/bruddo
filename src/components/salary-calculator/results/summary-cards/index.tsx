import { FormState } from '@/components/salary-calculator/actions';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { CalculationPeriod } from '@/types/common';
import { HandCoins, Hospital, Landmark } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';

type Props = {
  results: FormState;
};

export default function SummaryCards({ results }: Props) {
  const format = useFormatter();
  const t = useTranslations();
  const { employeeResults } = results;

  if (!employeeResults)
    return (
      <div className="flex gap-4 lg:gap-6 items-stretch flex-wrap">
        <Skeleton className="flex-1 h-140px min-w-40 lg:min-w-52 rounded-lg" />
        <Skeleton className="flex-1 h-140px min-w-40 lg:min-w-52 rounded-lg" />
        <Skeleton className="flex-1 h-140px min-w-40 lg:min-w-52 rounded-lg" />
      </div>
    );

  // return;

  const data = [
    {
      percentage:
        employeeResults.taxes.total[CalculationPeriod.enum.YEAR] /
        employeeResults.grossIncome[CalculationPeriod.enum.YEAR],
      description: t('Results.summaryCards.tax.title'),
      icon: <Landmark className="stroke-secondary w-9 h-9" />,
    },
    {
      percentage:
        employeeResults.socialSecurity.total[CalculationPeriod.enum.YEAR] /
        employeeResults.grossIncome[CalculationPeriod.enum.YEAR],
      description: t('Results.summaryCards.socialSecurity.title'),
      icon: <Hospital className="stroke-secondary w-9 h-9" />,
    },
    {
      percentage:
        employeeResults.netIncome[CalculationPeriod.enum.YEAR] /
        employeeResults.grossIncome[CalculationPeriod.enum.YEAR],
      description: t('Results.summaryCards.netIncome.title'),
      icon: <HandCoins className="stroke-secondary w-9 h-9" />,
    },
  ];

  return (
    <div className="flex gap-4 lg:gap-6 items-stretch flex-wrap">
      {data.map(({ percentage, description, icon }, index) => (
        <Card
          key={index}
          className="flex-1 min-w-40 lg:min-w-52"
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold green-500 pb-2 flex justify-between items-center">
              {isNaN(percentage) ? '-' : format.number(percentage, { style: 'percent' })}
              {icon}
            </CardTitle>
            <Progress value={percentage * 100} />
            <CardDescription className="pt-1">{description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
