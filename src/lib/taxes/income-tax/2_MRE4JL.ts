import { InternalFields } from "./fields/InternalFields";
import { SalaryPaymentPeriod } from "@/types/income-tax";
import { UserInputs } from "./fields/UserInputs";

/**
 * MRE4JL - Ermittlung des Jahresarbeitslohns nach § 39b Absatz 2 Satz 2 EStG
 */
export const calculateMRE4JL = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  /**
   * Factors to multiply input values with to get yearly values
   */
  const salaryPaymentPeriodFactors = {
    [SalaryPaymentPeriod.YEAR]: 1,
    [SalaryPaymentPeriod.MONTH]: 12,
    [SalaryPaymentPeriod.WEEK]: 360 / 7,
    [SalaryPaymentPeriod.DAY]: 360,
  };

  internalFields.ZRE4J =
    (userInputs.RE4 * salaryPaymentPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.ZVBEZJ =
    (userInputs.VBEZ * salaryPaymentPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.JLFREIB =
    (userInputs.LZZFREIB * salaryPaymentPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.JLHINZU =
    (userInputs.LZZHINZU * salaryPaymentPeriodFactors[userInputs.LZZ]) / 100;

  if (userInputs.AF === 0) {
    userInputs.setF(1);
  }
};
