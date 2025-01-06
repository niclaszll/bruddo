import { calculateMRE4 } from "./3_MRE4";
import { calculateMRE4ABZ } from "./5_MRE4ABZ";
import { calculateMZTABFB } from "./7_MZTABFB";
import { InternalFields } from "./fields/InternalFields";
import { UserInputs } from "./fields/UserInputs";

/**
 * MRE4SONST - Sonderberechnung mit sonstigen Bezügen für Berechnung bei sonstigen Bezügen
 */
export const calculateMRE4SONST = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  // MRE4
  calculateMRE4();

  internalFields.FVB = internalFields.FVBSO;

  // MRE4ABZ
  calculateMRE4ABZ();

  internalFields.ZRE4VP =
    internalFields.ZRE4VP +
    userInputs.MBV / 100 -
    userInputs.JRE4ENT / 100 -
    userInputs.SONSTENT / 100;

  internalFields.FVBZ = internalFields.FVBZSO;

  // MZTABFB
  calculateMZTABFB();

  internalFields.VFRBS2 =
    (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100 -
    internalFields.VFRBS1;
};
