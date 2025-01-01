import { calculateMSONST } from "./17_MSONST";
import { setupParameters } from "./1_MPARA";
import { calculateAnnualSalaryAndAllowances } from "./2_MRE4JL";
import { calculateAllowances } from "./3_MRE4";
import { calculateAnnualSalaryAfterDeductingAllowances } from "./5_MRE4ABZ";
import { calculateAnnualIncometaxOnCurrentRemuneration } from "./6_MBERECH";
import { InternalFields } from "./InternalFields";

export const calculateIncomeTaxFor2025 = () => {
  const internalFields = InternalFields.instance;

  // MPARA
  setupParameters();

  // MRE4JL
  calculateAnnualSalaryAndAllowances();

  internalFields.VBEZBSO = 0;

  // MRE4
  calculateAllowances();

  // MRE4ABZ
  calculateAnnualSalaryAfterDeductingAllowances();

  // MBERECH
  calculateAnnualIncometaxOnCurrentRemuneration();

  // MSONST
  calculateMSONST();
};
