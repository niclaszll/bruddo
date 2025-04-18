import { roundDownToFullEuro } from '@/util/format';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { calculateUPTAB24 } from './22_UPTAB24';

/**
 * UP5-6
 */
export const calculateUP5_6 = () => {
  const internalFields = InternalFieldsClient.instance;

  internalFields.X = internalFields.ZX * 1.25;

  calculateUPTAB24();

  internalFields.ST1 = internalFields.ST;
  internalFields.X = internalFields.ZX * 0.75;

  calculateUPTAB24();

  internalFields.ST2 = internalFields.ST;
  internalFields.DIFF = (internalFields.ST1 - internalFields.ST2) * 2;
  internalFields.MIST = roundDownToFullEuro(internalFields.ZX * 0.14);

  internalFields.ST = Math.max(internalFields.MIST, internalFields.DIFF);
};
