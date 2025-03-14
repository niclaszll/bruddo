'use server';

import EmployeeService, { EmployeeResults } from '@/domain/aggregation/employee-service';
import { UserInputs } from '@/types/form';

export type FormState = {
  employeeResults: EmployeeResults;
  employeeResultsRange: EmployeeResults[] | undefined;
  userInputs: UserInputs;
  error: boolean;
};

export async function onSubmitAction(prevState: FormState, data: FormData): Promise<FormState> {
  const parsed = UserInputs.safeParse(Object.fromEntries(data));

  if (!parsed.success) {
    return {
      ...prevState,
      employeeResultsRange: undefined,
      error: true,
    };
  }

  const { data: parsedData } = parsed;

  const stepSize = parsedData.grossIncome < 10000 ? 100 : 1000;

  const [employeeResults, employeeResultsRange] = await Promise.all([
    EmployeeService.getAggregatedResults(parsedData),
    EmployeeService.getAggregatedResultsInRange(
      1000,
      Math.min(parsedData.grossIncome * 2, 500_000),
      stepSize,
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
