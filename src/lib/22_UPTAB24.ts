import { InternalFields } from "./InternalFields";

/**
 * UPTAB24 - Tarifliche Einkommensteuer (§ 32a EStG)
 */
export const calculateStandardIncomeTax = () => {
  const internalFields = InternalFields.instance;

  if (internalFields.X < internalFields.GFB + 1) {
    internalFields.ST = 0;
  } else if (internalFields.X < 17006) {
    internalFields.Y = (internalFields.X - internalFields.GFB) / 10000;
    internalFields.RW = internalFields.Y * 954.8;
    internalFields.RW = internalFields.RW + 1400;
    internalFields.ST = Math.floor(internalFields.RW * internalFields.Y);
  } else if (internalFields.X < 66761) {
    internalFields.Y = (internalFields.X - 17005) / 10000;
    internalFields.RW = internalFields.Y * 181.19;
    internalFields.RW = internalFields.RW + 2397;
    internalFields.RW = internalFields.RW * internalFields.Y;
    internalFields.ST = Math.floor(internalFields.RW + 991.21);
  } else if (internalFields.X < 277826) {
    internalFields.ST = Math.floor(internalFields.X * 0.42 - 10636.31);
  } else {
    internalFields.ST = Math.floor(internalFields.X * 0.45 - 18971.06);
  }

  internalFields.ST = internalFields.ST * internalFields.KZTAB;
};
