import { calculateMSONST } from "./17_MSONST";
import { setupParameters } from "./1_MPARA";
import { calculateMRE4JL } from "./2_MRE4JL";
import { calculateMRE4 } from "./3_MRE4";
import { calculateMRE4ABZ } from "./5_MRE4ABZ";
import { calculateMBERECH } from "./6_MBERECH";
import { InternalFields } from "./InternalFields";

export const calculateIncomeTaxFor2025 = () => {
  const internalFields = InternalFields.instance;

  // MPARA
  setupParameters();

  // MRE4JL
  calculateMRE4JL();

  internalFields.VBEZBSO = 0;

  // MRE4
  calculateMRE4();

  // MRE4ABZ
  calculateMRE4ABZ();

  // MBERECH
  calculateMBERECH();

  // MSONST
  calculateMSONST();
};
