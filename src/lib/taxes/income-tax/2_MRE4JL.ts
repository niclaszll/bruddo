import { CalculationPeriod } from '@/types/common';

import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

/**
 * MRE4JL - Ermittlung des Jahresarbeitslohns nach § 39b Absatz 2 Satz 2 EStG
 */
export const calculateMRE4JL = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  /**
   * Factors to multiply input values with to get yearly values
   */
  const calculationPeriodFactors = {
    [CalculationPeriod.enum.YEAR]: 1,
    [CalculationPeriod.enum.MONTH]: 12,
    [CalculationPeriod.enum.WEEK]: 360 / 7,
    [CalculationPeriod.enum.DAY]: 360,
  };

  internalFields.ZRE4J = (userInputs.RE4 * calculationPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.ZVBEZJ = (userInputs.VBEZ * calculationPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.JLFREIB = (userInputs.LZZFREIB * calculationPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.JLHINZU = (userInputs.LZZHINZU * calculationPeriodFactors[userInputs.LZZ]) / 100;

  if (userInputs.AF === 0) {
    userInputs.setF(1);
  }
};
