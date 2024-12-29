import { InternalFields } from "./InternalFields";
import taxData from "./ProportionalTaxAllowanceForElderlyRetiredPersons.json";
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

  const allowancePercentage = taxData.find(
    (entry) => entry.index === internalFields.K
  )?.allowancePercentage;

  if (allowancePercentage === undefined) {
    throw new Error(
      `No allowancePercentage data found for table index ${internalFields.K}`
    );
  }

  internalFields.ALTE = Math.ceil(internalFields.BMG * allowancePercentage);

  const maxAllowance = taxData.find(
    (entry) => entry.index === internalFields.K
  )?.maxAllowance;

  if (maxAllowance === undefined) {
    throw new Error(
      `No maxAllowance data found for table index ${internalFields.K}`
    );
  }

  internalFields.HBALTE = Math.min(internalFields.ALTE, maxAllowance);
};
