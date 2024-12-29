import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MRE4 - Ermittlung der Freibeträge nach § 39b Absatz 2 Satz 3 EStG
 */
export const calculateAllowances = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (internalFields.ZVBEZJ === 0) {
    internalFields.FVBZ = 0;
    internalFields.FVB = 0;
    internalFields.FVBZSO = 0;
    internalFields.FVBSO = 0;
  } else {
    if (userInputs.VJAHR < 2006) {
      internalFields.J = 1;
    } else if (userInputs.VJAHR < 2058) {
      internalFields.J = userInputs.VJAHR - 2004;
    } else {
      internalFields.J = 54;
    }
    // TODO: start from <LZZ = 1>
  }
};
