'use client';

import { FormState } from '../../actions';
import { ContributionBreakdownStackedBarChart } from './breakdown-stacked-bar';

type Props = {
  results: FormState;
};

export default function ResultCharts({ results }: Props) {
  if (!results.employeeResults || !results.employerResults) return null;

  return <ContributionBreakdownStackedBarChart results={results} />;
}
