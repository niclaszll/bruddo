import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';
import { calculationPeriodFactors } from './utils';

/**
 * MRE4JL - Ermittlung des Jahresarbeitslohns nach § 39b Absatz 2 Satz 2 EStG
 */
export const calculateMRE4JL = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  internalFields.ZRE4J = (userInputs.RE4 * calculationPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.ZVBEZJ = (userInputs.VBEZ * calculationPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.JLFREIB = (userInputs.LZZFREIB * calculationPeriodFactors[userInputs.LZZ]) / 100;
  internalFields.JLHINZU = (userInputs.LZZHINZU * calculationPeriodFactors[userInputs.LZZ]) / 100;

  if (userInputs.AF === 0) {
    userInputs.setF(1);
  }
};
