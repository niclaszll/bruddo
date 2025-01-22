import { roundDownToFullEuro } from '@/util/format';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { getIncomeTaxTariffTypeFactor } from '../utils';

/**
 * UPTAB24 - Tarifliche Einkommensteuer (§ 32a EStG)
 */
export const calculateUPTAB24 = () => {
  const internalFields = InternalFieldsClient.instance;

  if (internalFields.X < internalFields.GFB + 1) {
    internalFields.ST = 0;
  } else if (internalFields.X < 17006) {
    internalFields.Y = (internalFields.X - internalFields.GFB) / 10000;
    internalFields.RW = internalFields.Y * 954.8;
    internalFields.RW = internalFields.RW + 1400;
    internalFields.ST = roundDownToFullEuro(internalFields.RW * internalFields.Y);
  } else if (internalFields.X < 66761) {
    internalFields.Y = (internalFields.X - 17005) / 10000;
    internalFields.RW = internalFields.Y * 181.19;
    internalFields.RW = internalFields.RW + 2397;
    internalFields.RW = internalFields.RW * internalFields.Y;
    internalFields.ST = roundDownToFullEuro(internalFields.RW + 991.21);
  } else if (internalFields.X < 277826) {
    internalFields.ST = roundDownToFullEuro(internalFields.X * 0.42 - 10636.31);
  } else {
    internalFields.ST = roundDownToFullEuro(internalFields.X * 0.45 - 18971.06);
  }

  internalFields.ST = internalFields.ST * getIncomeTaxTariffTypeFactor(internalFields.KZTAB);
};
