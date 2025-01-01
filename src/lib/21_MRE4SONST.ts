import { calculateAllowances } from "./3_MRE4";
import { calculateAnnualSalaryAfterDeductingAllowances } from "./5_MRE4ABZ";
import { calculateFixedTableAllowances } from "./7_MZTABFB";
import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MRE4SONST - Sonderberechnung mit sonstigen Bezügen für Berechnung bei sonstigen Bezügen
 */
export const calculateMRE4SONST = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  // MRE4
  calculateAllowances();

  internalFields.FVB = internalFields.FVBSO;

  // MRE4ABZ
  calculateAnnualSalaryAfterDeductingAllowances();

  internalFields.ZRE4VP =
    internalFields.ZRE4VP +
    userInputs.MBV / 100 -
    userInputs.JRE4ENT / 100 -
    userInputs.SONSTENT / 100;

  internalFields.FVBZ = internalFields.FVBZSO;

  // MZTABFB
  calculateFixedTableAllowances();

  internalFields.VFRBS2 = (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100 - internalFields.VFRBS1;
};
