import { roundDownToFullEuro } from "@/util/format";
import { calculateSTSMIN } from "./18_STSMIN";
import { calculateMOSONST } from "./20_MOSONST";
import { calculateMRE4SONST } from "./21_MRE4SONST";
import { calculateMLSTJAHR } from "./8_MLSTJAHR";
import { calculateUPVKV } from "./9_UPVKVLZZ";
import { InternalFields } from "./fields/InternalFields";
import { UserInputs } from "./fields/UserInputs";

/**
 * MSONST - Berechnung sonstiger Bezüge nach § 39b Absatz 3 Satz 1 bis 8 EStG
 */
export const calculateMSONST = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  userInputs.setLZZ(1);

  if (userInputs.ZMVB === 0) userInputs.setZMVB(12);

  if (userInputs.SONSTB === 0 && userInputs.MBV === 0) {
    internalFields.VKVSONST = 0;
    internalFields.LSTSO = 0;
    internalFields.STS = 0;
    internalFields.SOLZS = 0;
    internalFields.BKS = 0;
  } else {
    // MOSONST
    calculateMOSONST();

    // UPVKV
    calculateUPVKV();

    internalFields.VKVSONST = internalFields.VKV;
    internalFields.ZRE4J = (userInputs.JRE4 + userInputs.SONSTB) / 100;
    internalFields.ZVBEZJ = (userInputs.JVBEZ + userInputs.VBS) / 100;
    internalFields.VBEZBSO = userInputs.STERBE;

    // MRE4SONST
    calculateMRE4SONST();

    // MLSTJAHR
    calculateMLSTJAHR();

    internalFields.WVFRBM = Math.max(
      (internalFields.ZVE - internalFields.GFB) * 100,
      0
    );

    // UPVKV
    calculateUPVKV();

    internalFields.VKVSONST = internalFields.VKV - internalFields.VKVSONST;
    internalFields.LSTSO = internalFields.ST * 100;

    const STS = (internalFields.LSTSO - internalFields.LSTOSO) * userInputs.F;
    // Note: negative numbers are rounded according to their amount!
    internalFields.STS = Math.sign(STS) * roundDownToFullEuro(Math.abs(STS));

    // STSMIN
    calculateSTSMIN();
  }
};
