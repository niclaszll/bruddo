import { roundDownToFullEuro } from "@/util/format";
import { calculateStandardIncomeTax } from "./22_UPTAB24";
import { InternalFields } from "./InternalFields";

/**
 * UP5-6
 */
export const calculateUP5_6 = () => {
  const internalFields = InternalFields.instance;

  internalFields.X = internalFields.ZX * 1.25;

  // UPTAB24
  calculateStandardIncomeTax();

  internalFields.ST1 = internalFields.ST;
  internalFields.X = internalFields.ZX * 0.75;

  // UPTAB24
  calculateStandardIncomeTax();

  internalFields.ST2 = internalFields.ST;
  internalFields.DIFF = (internalFields.ST1 - internalFields.ST2) * 2;
  internalFields.MIST = roundDownToFullEuro(internalFields.ZX * 0.14);

  internalFields.ST = Math.max(internalFields.MIST, internalFields.DIFF);
};
