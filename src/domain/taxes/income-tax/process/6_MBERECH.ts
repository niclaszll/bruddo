import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';
import { calculateMRE4ABZ } from './5_MRE4ABZ';
import { calculateMZTABFB } from './7_MZTABFB';
import { calculateMLSTJAHR } from './8_MLSTJAHR';
import { calculateUPVKVLZZ } from './9_UPVKVLZZ';
import { calculateUPLSTLZZ } from './10_UPLSTLZZ';
import { calculateMSOLZ } from './15_MSOLZ';

/**
 * MBERECH - Ermittlung der Jahreslohnsteuer auf laufende Bezüge
 */
export const calculateMBERECH = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  calculateMZTABFB();

  internalFields.VFRB = (internalFields.ANP + internalFields.FVB + internalFields.FVBZ) * 100;

  calculateMLSTJAHR();

  internalFields.WVFRB = Math.max((internalFields.ZVE - internalFields.GFB) * 100, 0);

  internalFields.LSTJAHR = internalFields.ST * userInputs.F;

  calculateUPLSTLZZ();

  calculateUPVKVLZZ();

  if (userInputs.ZKF > 0) {
    internalFields.ZTABFB = internalFields.ZTABFB + internalFields.KFB;

    calculateMRE4ABZ();

    calculateMLSTJAHR();

    internalFields.JBMG = internalFields.ST * userInputs.F;
  } else {
    internalFields.JBMG = internalFields.LSTJAHR;
  }

  calculateMSOLZ();
};
