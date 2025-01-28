'use client';

import { Table, TableBody, TableCell, TableFooter, TableRow } from '@/components/ui/table';
import { useFormatCurrency } from '@/hooks/common';
import { useTranslations } from 'next-intl';

import { FormState } from '../../actions';

type Props = {
  results: FormState;
};

export default function ResultTable({ results }: Props) {
  const t = useTranslations('ResultTable');
  const formatCurrency = useFormatCurrency();

  if (!results.employeeResults || !results.employerResults) return null;

  return (
    <div className="max-w-xxl border rounded-lg overflow-hidden">
      <Table>
        <TableBody>
          <TableRow className="font-bold bg-muted/30">
            <TableCell>{t('employeeResults.grossIncome')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(results.employeeResults.grossIncome)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.taxes.incomeTax')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.taxes.incomeTax)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.taxes.solidaritySurcharge')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.taxes.solidaritySurcharge)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.taxes.churchTax')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.taxes.churchTax)}
            </TableCell>
          </TableRow>
          <TableRow className="font-semibold bg-muted/30">
            <TableCell>{t('employeeResults.taxes.total')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.taxes.total)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.healthInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.socialSecurity.healthInsurance)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.nursingCareInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.socialSecurity.nursingCareInsurance)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.pensionInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.socialSecurity.pensionInsurance)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.unemploymentInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.socialSecurity.unemploymentInsurance)}
            </TableCell>
          </TableRow>
          <TableRow className="font-semibold bg-muted/30">
            <TableCell>{t('employeeResults.socialSecurity.total')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.socialSecurity.total)}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="font-bold">
            <TableCell colSpan={1}>{t('employeeResults.netIncome')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(results.employeeResults.netIncome)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
