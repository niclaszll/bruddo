import { roundDownToFullCent } from "@/util/format";
import { calculateMSOLZSTS } from "./19_MSOLZSTS";
import { InternalFields } from "./fields/InternalFields";
import { UserInputs } from "./fields/UserInputs";

/**
 * STSMIN
 */
export const calculateSTSMIN = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (internalFields.STS < 0) {
    if (userInputs.MBV !== 0) {
      internalFields.LSTLZZ = internalFields.LSTLZZ + internalFields.STS;
      internalFields.LSTLZZ = Math.max(internalFields.LSTLZZ, 0);

      internalFields.SOLZLZZ = roundDownToFullCent(
        internalFields.SOLZLZZ + (internalFields.STS * 5.5) / 100
      );
      internalFields.SOLZLZZ = Math.max(internalFields.SOLZLZZ, 0);

      internalFields.BK = internalFields.BK + internalFields.STS;
      internalFields.BK = Math.max(internalFields.BK, 0);
    }

    // Negative Lohnsteuer auf sonstigen Bezug wird nicht zugelassen.
    internalFields.STS = 0;
    internalFields.SOLZS = 0;
  } else {
    // MSOLZSTS
    calculateMSOLZSTS();
  }

  internalFields.BKS = userInputs.R > 0 ? internalFields.STS : 0;
};
