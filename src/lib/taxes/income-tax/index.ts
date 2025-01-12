import { setupMPARA } from './1_MPARA';
import { calculateMRE4JL } from './2_MRE4JL';
import { calculateMRE4 } from './3_MRE4';
import { calculateMRE4ABZ } from './5_MRE4ABZ';
import { calculateMBERECH } from './6_MBERECH';
import { calculateMSONST } from './17_MSONST';
import { InternalFieldsClient } from './fields/InternalFields';

export const calculateIncomeTax = () => {
  const internalFields = InternalFieldsClient.instance;

  setupMPARA();
  calculateMRE4JL();

  internalFields.VBEZBSO = 0;

  calculateMRE4();
  calculateMRE4ABZ();
  calculateMBERECH();
  calculateMSONST();

  return {
    // BK: internalFields.BK,
    // BKS: internalFields.BKS,
    // SOLZS: internalFields.SOLZS,
    // STS: internalFields.STS,
    // VKVLZZ: internalFields.VKVLZZ,
    // VKVSONST: internalFields.VKVSONST,
    incomeTax: internalFields.LSTLZZ / 100,
    solidaritySurcharge: internalFields.SOLZLZZ / 100,
  };
};
