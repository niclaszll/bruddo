import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MRE4ALTE - Ermittlung des Altersentlastungsbetrags (§ 39b Absatz 2 Satz 3 EStG
 */
export const calculateProportionalTaxAllowanceForElderlyRetiredPersons = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (userInputs.ALTER1 === 0) {
    internalFields.ALTE = 0;
  } else {
    if (userInputs.AJAHR < 2006) {
      internalFields.K = 1;
    } else if (userInputs.AJAHR < 2058) {
      internalFields.K = userInputs.AJAHR - 2004;
    } else {
      internalFields.K = 54;
    }
  }

  internalFields.BMG = internalFields.ZRE4J - internalFields.ZVBEZJ;

  internalFields.ALTE = Math.ceil(
    internalFields.BMG * internalFields.getTAB4(internalFields.K)
  );

  internalFields.HBALTE = Math.min(
    internalFields.ALTE,
    internalFields.getTAB5(internalFields.K)
  );
};
