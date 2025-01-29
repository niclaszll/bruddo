'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFormatCurrency } from '@/hooks/common';
import { CalculationPeriod } from '@/types/common';
import { useTranslations } from 'next-intl';

import { FormState } from '../../actions';

type Props = {
  results: FormState;
};

export default function ResultTable({ results }: Props) {
  const t = useTranslations('Results');
  const formatCurrency = useFormatCurrency();

  if (!results.employeeResults || !results.employerResults) return null;

  return (
    <div className="max-w-xxl border rounded-lg overflow-hidden">
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
            <TableCell>{t('employeeResults.grossIncome')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(results.employeeResults.grossIncome[CalculationPeriod.enum.MONTH])}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(results.employeeResults.grossIncome[CalculationPeriod.enum.YEAR])}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.taxes.incomeTax')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.taxes.incomeTax[CalculationPeriod.enum.MONTH],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.taxes.incomeTax[CalculationPeriod.enum.YEAR],
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.taxes.solidaritySurcharge')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.taxes.solidaritySurcharge[CalculationPeriod.enum.MONTH],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.taxes.solidaritySurcharge[CalculationPeriod.enum.YEAR],
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.taxes.churchTax')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.taxes.churchTax[CalculationPeriod.enum.MONTH],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.taxes.churchTax[CalculationPeriod.enum.YEAR],
              )}
            </TableCell>
          </TableRow>
          <TableRow className="font-semibold bg-muted/30">
            <TableCell>{t('employeeResults.taxes.total')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.taxes.total[CalculationPeriod.enum.MONTH])}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(-results.employeeResults.taxes.total[CalculationPeriod.enum.YEAR])}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.healthInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.healthInsurance[
                  CalculationPeriod.enum.MONTH
                ],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.healthInsurance[
                  CalculationPeriod.enum.YEAR
                ],
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.nursingCareInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.nursingCareInsurance[
                  CalculationPeriod.enum.MONTH
                ],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.nursingCareInsurance[
                  CalculationPeriod.enum.YEAR
                ],
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.pensionInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.pensionInsurance[
                  CalculationPeriod.enum.MONTH
                ],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.pensionInsurance[
                  CalculationPeriod.enum.YEAR
                ],
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t('employeeResults.socialSecurity.unemploymentInsurance')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.unemploymentInsurance[
                  CalculationPeriod.enum.MONTH
                ],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.unemploymentInsurance[
                  CalculationPeriod.enum.YEAR
                ],
              )}
            </TableCell>
          </TableRow>
          <TableRow className="font-semibold bg-muted/30">
            <TableCell>{t('employeeResults.socialSecurity.total')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.total[CalculationPeriod.enum.MONTH],
              )}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                -results.employeeResults.socialSecurity.total[CalculationPeriod.enum.YEAR],
              )}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow className="font-bold">
            <TableCell colSpan={1}>{t('employeeResults.netIncome')}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(results.employeeResults.netIncome[CalculationPeriod.enum.MONTH])}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(results.employeeResults.netIncome[CalculationPeriod.enum.YEAR])}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
