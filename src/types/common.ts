import { z } from 'zod';

export enum GermanFederalState {
  BadenWuerttemberg = 'BW',
  Bavaria = 'BY',
  Berlin = 'BE',
  Brandenburg = 'BB',
  Bremen = 'HB',
  Hamburg = 'HH',
  Hesse = 'HE',
  LowerSaxony = 'NI',
  MecklenburgWesternPomerania = 'MV',
  NorthRhineWestphalia = 'NW',
  RhinelandPalatinate = 'RP',
  Saarland = 'SL',
  Saxony = 'SN',
  SaxonyAnhalt = 'ST',
  SchleswigHolstein = 'SH',
  Thuringia = 'TH',
}

export const CalculationPeriod = z.enum(['year', 'month']);
export type CalculationPeriod = z.infer<typeof CalculationPeriod>;

export const TaxClass = z.enum(['I', 'II', 'III', 'IV', 'V', 'VI']);
export type TaxClass = z.infer<typeof TaxClass>;

export const UserInputs = z.object({
  calculationPeriod: CalculationPeriod,
  grossIncome: z.preprocess(Number, z.number()),
  taxClass: TaxClass,
});

export type UserInputs = z.infer<typeof UserInputs>;
