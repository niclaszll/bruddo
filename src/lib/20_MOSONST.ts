import { calculateAllowances } from "./3_MRE4";
import { calculateAnnualSalaryAfterDeductingAllowances } from "./5_MRE4ABZ";
import { calculateFixedTableAllowances } from "./7_MZTABFB";
import { calculateAnnualWageTax } from "./8_MLSTJAHR";
import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MOSONST - Sonderberechnung ohne sonstige Bezüge für Berechnung bei sonstigen Bezügen oder Vergütung für mehrjährige Tätigkeit
 */
export const calculateMOSONST = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  internalFields.ZRE4J = userInputs.JRE4 / 100;
  internalFields.ZVBEZJ = userInputs.JVBEZ / 100;
  internalFields.JLFREIB = userInputs.JFREIB / 100;
  internalFields.JLHINZU = userInputs.JHINZU / 100;

  // MRE4
  calculateAllowances();

  // MRE4ABZ
  calculateAnnualSalaryAfterDeductingAllowances();

  internalFields.ZRE4VP = internalFields.ZRE4VP - userInputs.JRE4ENT / 100;

  // MZTABFB
  calculateFixedTableAllowances();

  internalFields.VFRBS1 =
    (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100;

  // MLSTJAHR
  calculateAnnualWageTax();

  internalFields.WVFRBO = (internalFields.ZVE - internalFields.GFB) * 100;
  internalFields.WVFRBO = Math.max(internalFields.WVFRBO, 0);

  internalFields.LSTOSO = internalFields.ST * 100;
};
