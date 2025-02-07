'use server';

import EmployeeService, { EmployeeResults } from '@/features/aggregation/employee-service';
import { UserInputs } from '@/types/form';

export type FormState = {
  employeeResults: EmployeeResults | undefined;
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

  const [employeeResults, employeeResultsRange] = await Promise.all([
    EmployeeService.getAggregatedResults(parsedData),
    EmployeeService.getAggregatedResultsInRange(
      1000,
      Math.min(parsedData.grossIncome * 2, 500_000),
      1000,
      parsedData,
    ),
  ]);

  return {
    employeeResults,
    employeeResultsRange,
    userInputs: parsedData,
    error: false,
  };
}
