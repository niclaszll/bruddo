'use server';

import AggregationService, {
  EmployeeResults,
  EmployerResults,
} from '@/features/aggregation/service';
import { UserInputs } from '@/types/form';

export type FormState = {
  employeeResults: EmployeeResults | undefined;
  employerResults: EmployerResults | undefined;
  error: boolean;
};

export async function onSubmitAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = UserInputs.safeParse(formData);

  if (!parsed.success) {
    return {
      employeeResults: prevState.employeeResults,
      employerResults: prevState.employeeResults,
      error: true,
    };
  }

  const employeeResults = AggregationService.getAggregatedResultsForEmployee(parsed.data);
  const employerResults = AggregationService.getAggregatedResultsForEmployer(parsed.data);

  return { employeeResults, employerResults, error: false };
}
