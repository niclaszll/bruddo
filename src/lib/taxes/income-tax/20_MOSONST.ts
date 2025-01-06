import { calculateMRE4 } from "./3_MRE4";
import { calculateMRE4ABZ } from "./5_MRE4ABZ";
import { calculateMZTABFB } from "./7_MZTABFB";
import { calculateMLSTJAHR } from "./8_MLSTJAHR";
import { InternalFields } from "./fields/InternalFields";
import { UserInputs } from "./fields/UserInputs";

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
  calculateMRE4();

  // MRE4ABZ
  calculateMRE4ABZ();

  internalFields.ZRE4VP = internalFields.ZRE4VP - userInputs.JRE4ENT / 100;

  // MZTABFB
  calculateMZTABFB();

  internalFields.VFRBS1 =
    (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100;

  // MLSTJAHR
  calculateMLSTJAHR();

  internalFields.WVFRBO = (internalFields.ZVE - internalFields.GFB) * 100;
  internalFields.WVFRBO = Math.max(internalFields.WVFRBO, 0);

  internalFields.LSTOSO = internalFields.ST * 100;
};
