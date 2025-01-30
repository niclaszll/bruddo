'use client';

import { Card } from '@/components/ui/card';
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

import { FormState } from '../../actions';
import { getTableRows } from './helpers';

type Props = {
  results: FormState;
};

function DesktopTable({ results }: Props) {
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();

  if (!results.employeeResults || !results.employerResults) return null;

  const rows = getTableRows(results);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-right">Monatlich</TableHead>
          <TableHead className="text-right">Jährlich</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="font-bold bg-muted/30">
          <TableCell>{t('Results.employeeResults.grossIncome')}</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults.grossIncome[CalculationPeriod.enum.MONTH])}
          </TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults.grossIncome[CalculationPeriod.enum.YEAR])}
          </TableCell>
        </TableRow>
        {rows.map((row, index) => (
          <TableRow
            key={index}
            className={row.isBold ? 'font-semibold bg-muted/30' : undefined}
          >
            <TableCell>{t(row.label)}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-row.value[CalculationPeriod.enum.MONTH])}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(-row.value[CalculationPeriod.enum.YEAR])}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-bold">
          <TableCell colSpan={1}>{t('Results.employeeResults.netIncome')}</TableCell>
          <TableCell className="text-right underline decoration-primary decoration-2 underline-offset-8">
            {formatCurrency(results.employeeResults.netIncome[CalculationPeriod.enum.MONTH])}
          </TableCell>
          <TableCell className="text-right underline decoration-primary decoration-2 underline-offset-8">
            {formatCurrency(results.employeeResults.netIncome[CalculationPeriod.enum.YEAR])}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function MobileTable({ results }: Props) {
  const t = useTranslations();
  const formatCurrency = useFormatCurrency();

  if (!results.employeeResults || !results.employerResults) return null;

  const rows = getTableRows(results);

  return (
    <Tabs defaultValue={CalculationPeriod.enum.MONTH}>
      <div className="px-2 pt-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={CalculationPeriod.enum.MONTH}>Monatlich</TabsTrigger>
          <TabsTrigger value={CalculationPeriod.enum.YEAR}>Jährlich</TabsTrigger>
        </TabsList>
      </div>
      {[CalculationPeriod.enum.MONTH, CalculationPeriod.enum.YEAR].map((value) => (
        <TabsContent
          value={value}
          key={value}
        >
          <Table>
            <TableBody>
              <TableRow className="font-bold bg-muted/30">
                <TableCell>{t('Results.employeeResults.grossIncome')}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(results.employeeResults!.grossIncome[value])}
                </TableCell>
              </TableRow>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  className={row.isBold ? 'font-semibold bg-muted/30' : undefined}
                >
                  <TableCell>{t(row.label)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(-row.value[value])}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="font-bold">
                <TableCell colSpan={1}>{t('Results.employeeResults.netIncome')}</TableCell>
                <TableCell className="text-right underline decoration-primary decoration-2 underline-offset-8">
                  {formatCurrency(results.employeeResults!.netIncome[value])}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default function ResultTable({ results }: Props) {
  if (!results.employeeResults || !results.employerResults) return null;

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
}
