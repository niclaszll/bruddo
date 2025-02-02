'use server';

import AggregationService, {
  EmployeeResults,
  EmployerResults,
} from '@/features/aggregation/service';
import { UserInputs } from '@/types/form';

export type FormState = {
  employeeResults: EmployeeResults | undefined;
  employerResults: EmployerResults | undefined;
  employeeResultsRange: EmployeeResults[] | undefined;
  userInputs: UserInputs | undefined;
  error: boolean;
};

export async function onSubmitAction(prevState: FormState, data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = UserInputs.safeParse(formData);

  if (!parsed.success) {
    return {
      employeeResults: prevState.employeeResults,
      employerResults: prevState.employeeResults,
      employeeResultsRange: undefined,
      userInputs: undefined,
      error: true,
    };
  }

  const employeeResults = AggregationService.getAggregatedResultsForEmployee(parsed.data);
  const employerResults = AggregationService.getAggregatedResultsForEmployer(parsed.data);
  const employeeResultsRange = AggregationService.getAggregatedResultsForEmployeeInRange(
    1000,
    Math.min(parsed.data.grossIncome * 2, 500_000),
    1000,
    parsed.data,
  );

  return {
    employeeResults,
    employerResults,
    employeeResultsRange,
    userInputs: parsed.data,
    error: false,
  };
}
