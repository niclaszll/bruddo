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
  const parsed = UserInputs.safeParse(Object.fromEntries(data));

  if (!parsed.success) {
    return {
      ...prevState,
      employeeResultsRange: undefined,
      userInputs: undefined,
      error: true,
    };
  }

  const { data: parsedData } = parsed;

  const [employeeResults, employerResults, employeeResultsRange] = await Promise.all([
    AggregationService.getAggregatedResultsForEmployee(parsedData),
    AggregationService.getAggregatedResultsForEmployer(parsedData),
    AggregationService.getAggregatedResultsForEmployeeInRange(
      1000,
      Math.min(parsedData.grossIncome * 2, 500_000),
      1000,
      parsedData,
    ),
  ]);

  return {
    employeeResults,
    employerResults,
    employeeResultsRange,
    userInputs: parsedData,
    error: false,
  };
}
