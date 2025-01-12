import { calculateMRE4ABZ } from './5_MRE4ABZ';
import { calculateMZTABFB } from './7_MZTABFB';
import { calculateMLSTJAHR } from './8_MLSTJAHR';
import { calculateUPVKVLZZ } from './9_UPVKVLZZ';
import { calculateUPLSTLZZ } from './10_UPLSTLZZ';
import { calculateMSOLZ } from './15_MSOLZ';
import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

/**
 * MBERECH - Ermittlung der Jahreslohnsteuer auf laufende Bezüge
 */
export const calculateMBERECH = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  // MZTABFB
  calculateMZTABFB();

  internalFields.VFRB = (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100;

  // MLSTJAHR
  calculateMLSTJAHR();

  internalFields.WVFRB = Math.max((internalFields.ZVE - internalFields.GFB) * 100, 0);

  internalFields.LSTJAHR = internalFields.ST * userInputs.F;

  // UPLSTLZZ
  calculateUPLSTLZZ();

  // UPVKVLZZ
  calculateUPVKVLZZ();

  if (userInputs.ZKF > 0) {
    internalFields.ZTABFB = internalFields.ZTABFB + internalFields.KFB;

    // MRE4ABZ
    calculateMRE4ABZ();

    // MLSTJAHR
    calculateMLSTJAHR();

    internalFields.JBMG = internalFields.ST * userInputs.F;
  } else {
    internalFields.JBMG = internalFields.LSTJAHR;
  }

  // MSOLZ
  calculateMSOLZ();
};
