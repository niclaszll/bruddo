'use client';

import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { useFormatCurrency } from '@/hooks/common';

import { FormState } from '../actions';

type Props = {
  results: FormState;
};

export default function ResultsTable({ results }: Props) {
  const formatCurrency = useFormatCurrency();

  return (
    <Table className="max-w-xxl rounded-sm overflow-hidden">
      <TableBody>
        <TableRow className="font-bold bg-muted/30">
          <TableCell>Bruttogehalt</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.grossIncome)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lohnsteuer</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.taxes.incomeTax)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Solidaritätszuschlag</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.taxes.solidaritySurcharge)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Kirchensteuer</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.taxes.churchTax)}
          </TableCell>
        </TableRow>
        <TableRow className="font-bold bg-muted/30">
          <TableCell>Gesamtabzug Steuern</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.taxes.total)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Krankenversicherung</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.socialSecurity.healthInsurance)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Pflegeversicherung</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.socialSecurity.nursingCareInsurance)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Rentenversicherung</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.socialSecurity.pensionInsurance)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Arbeitslosenversicherung</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.socialSecurity.unemploymentInsurance)}
          </TableCell>
        </TableRow>
        <TableRow className="font-bold bg-muted/30">
          <TableCell>Gesamtabzug Sozialversicherung</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.socialSecurity.total)}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow className="font-bold">
          <TableCell colSpan={1}>Nettoverdienst</TableCell>
          <TableCell className="text-right">
            {formatCurrency(results.employeeResults?.netIncome)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
