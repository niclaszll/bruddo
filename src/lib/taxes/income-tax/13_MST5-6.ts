import { roundDownToFullEuro } from "@/util/format";
import { calculateUP5_6 } from "./14_UP5-6";
import { InternalFields } from "./fields/InternalFields";

/**
 * MST5-6 - Lohnsteuer für die Steuerklassen V und VI (§ 39b Absatz 2 Satz 7 EStG)
 */
export const calculateMST5_6 = () => {
  const internalFields = InternalFields.instance;

  internalFields.ZZX = internalFields.X;

  if (internalFields.ZZX > internalFields.W2STKL5) {
    internalFields.ZX = internalFields.W2STKL5;

    calculateUP5_6();

    if (internalFields.ZZX > internalFields.W3STKL5) {
      internalFields.ST = roundDownToFullEuro(
        internalFields.ST +
          (internalFields.W3STKL5 - internalFields.W2STKL5) * 0.42
      );
      internalFields.ST = roundDownToFullEuro(
        internalFields.ST + (internalFields.ZZX - internalFields.W3STKL5) * 0.45
      );
    } else {
      internalFields.ST = roundDownToFullEuro(
        internalFields.ST + (internalFields.ZZX - internalFields.W2STKL5) * 0.42
      );
    }
  } else {
    internalFields.ZX = internalFields.ZZX;

    calculateUP5_6();

    if (internalFields.ZZX > internalFields.W1STKL5) {
      internalFields.VERGL = internalFields.ST;
      internalFields.ZX = internalFields.W1STKL5;

      calculateUP5_6();

      internalFields.HOCH = roundDownToFullEuro(
        internalFields.ST + (internalFields.ZZX - internalFields.W1STKL5) * 0.42
      );
      internalFields.ST = Math.min(internalFields.HOCH, internalFields.VERGL);
    }
  }
};
