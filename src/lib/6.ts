import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

/**
 * MBERECH - Ermittlung der Jahreslohnsteuer auf laufende Bezüge
 */
export const calculateAnnualIncometaxOnCurrentRemuneration = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  // TODO: MZTABFB

  internalFields.VFRB =
    (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100;

  // TODO: MLSTJAHR

  internalFields.WVFRB = Math.max(
    (internalFields.ZVE - internalFields.GFB) * 100,
    0
  );

  internalFields.LSTJAHR = internalFields.ST * userInputs.F;

  // TODO: UPLSTLZZ
  // TODO: UPVKVLZZ

  if (userInputs.ZKF > 0) {
    internalFields.ZTABFB = internalFields.ZTABFB + internalFields.KFB;

    // TODO: MRE4ABZ
    // TODO: MLSTJAHR

    internalFields.JBMG = internalFields.ST * userInputs.F;
  } else {
    internalFields.JBMG = internalFields.LSTJAHR;
  }

  // TODO: MSOLZ
};
