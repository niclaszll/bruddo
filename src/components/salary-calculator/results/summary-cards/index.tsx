import { FormState } from '@/components/salary-calculator/actions';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalculationPeriod } from '@/types/common';
import { HandCoins, Hospital, PiggyBank } from 'lucide-react';
import { useFormatter } from 'next-intl';

type Props = {
  results: FormState;
};

export default function SummaryCards({ results }: Props) {
  const format = useFormatter();
  const { employeeResults } = results;

  if (!employeeResults) return null;

  const data = [
    {
      percentage:
        employeeResults.taxes.total[CalculationPeriod.enum.YEAR] /
        employeeResults.grossIncome[CalculationPeriod.enum.YEAR],
      description: 'gehen für Steuern drauf.',
      icon: <HandCoins className="stroke-secondary w-9 h-9" />,
    },
    {
      percentage:
        employeeResults.socialSecurity.total[CalculationPeriod.enum.YEAR] /
        employeeResults.grossIncome[CalculationPeriod.enum.YEAR],
      description: 'landen in Sozialversicherungen.',
      icon: <Hospital className="stroke-secondary w-9 h-9" />,
    },
    {
      percentage:
        employeeResults.netIncome[CalculationPeriod.enum.YEAR] /
        employeeResults.grossIncome[CalculationPeriod.enum.YEAR],
      description: 'bleiben dir am Ende übrig.',
      icon: <PiggyBank className="stroke-secondary w-9 h-9" />,
    },
  ];

  return (
    <div className="flex gap-3 lg:gap-6 items-stretch flex-wrap">
      {data.map(({ percentage, description, icon }, index) => (
        <Card
          key={index}
          className="flex-1 lg:min-w-52"
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
