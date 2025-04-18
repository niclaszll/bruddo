'use client';

import { FormState } from '@/components/form/actions';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import { getTableRows } from './helpers';

type Props = {
  results: FormState;
};

const BaseTable = memo(function BaseTable({
  results,
  rows,
  periods,
  header,
}: {
  results: FormState;
  rows: ReturnType<typeof getTableRows>;
  periods: CalculationPeriod[];
  header?: React.ReactNode;
}) {
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();

  return (
    <Table>
      {header && <TableHeader>{header}</TableHeader>}
      <TableBody>
        <TableRow className="font-bold bg-muted/30">
          <TableCell>{t('Results.employeeResults.grossSalary.default')}</TableCell>
          {periods.map((period) => (
            <TableCell
              key={period}
              className="text-right"
            >
              {formatCurrency(results.employeeResults!.grossSalary[period])}
            </TableCell>
          ))}
        </TableRow>
        {rows.map((row, index) => (
          <TableRow
            key={index}
            className={row.isBold ? 'font-semibold bg-muted/30' : undefined}
          >
            <TableCell>{t(row.label)}</TableCell>
            {periods.map((period) => (
              <TableCell
                key={period}
                className="text-right"
              >
                {formatCurrency(-row.value[period])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-bold">
          <TableCell colSpan={1}>{t('Results.employeeResults.netSalary.default')}</TableCell>
          {periods.map((period) => (
            <TableCell
              key={period}
              className="text-right underline decoration-primary decoration-2 underline-offset-8"
            >
              {formatCurrency(results.employeeResults!.netSalary[period])}
            </TableCell>
          ))}
        </TableRow>
      </TableFooter>
    </Table>
  );
});

const DesktopTable = memo(function DesktopTable({ results }: Props) {
  const t = useTranslations();

  if (!results.employeeResults) return null;

  const rows = getTableRows(results);
  const periods = [CalculationPeriod.enum.MONTH, CalculationPeriod.enum.YEAR];

  const header = (
    <TableRow>
      <TableHead></TableHead>
      <TableHead className="text-right">{t('Results.table.header.monthly')}</TableHead>
      <TableHead className="text-right">{t('Results.table.header.yearly')}</TableHead>
    </TableRow>
  );

  return (
    <BaseTable
      results={results}
      rows={rows}
      periods={periods}
      header={header}
    />
  );
});

const MobileTable = memo(function MobileTable({ results }: Props) {
  const t = useTranslations();

  if (!results.employeeResults) return null;

  const rows = getTableRows(results);

  return (
    <Tabs defaultValue={CalculationPeriod.enum.MONTH}>
      <div className="px-3 pt-3 pb-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={CalculationPeriod.enum.MONTH}>
            {t('Results.table.header.monthly')}
          </TabsTrigger>
          <TabsTrigger value={CalculationPeriod.enum.YEAR}>
            {t('Results.table.header.yearly')}
          </TabsTrigger>
        </TabsList>
      </div>
      {[CalculationPeriod.enum.MONTH, CalculationPeriod.enum.YEAR].map((period) => (
        <TabsContent
          value={period}
          key={period}
        >
          <BaseTable
            results={results}
            rows={rows}
            periods={[period]}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
});

const ResultTable = memo(function ResultTable({ results }: Props) {
  if (!results.employeeResults)
    return <Skeleton className="min-w-full h-[646px] lg:h-[630px] rounded-lg" />;

  return (
    <Card className="overflow-hidden">
      <div className="max-md:hidden">
        <DesktopTable results={results} />
      </div>
      <div className="md:hidden">
        <MobileTable results={results} />
      </div>
    </Card>
  );
});

export default ResultTable;
