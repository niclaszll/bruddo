import { z } from 'zod';

/**
 * Einkommensteuer-Tarifarten:
 * BASIC = Grundtarif
 * SPLITTING = Splittingverfahren
 */
export const IncomeTaxTariffType = z.enum(['BASIC', 'SPLITTING']);
export type IncomeTaxTariffType = z.infer<typeof IncomeTaxTariffType>;

/**
 * STATUTORY = gesetzlich krankenversicherte Arbeitnehmer
 * PRIVATE_NO_CONTRIB = ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss
 * PRIVATE_WITH_CONTRIB = ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss
 */
export const HealthInsuranceType = z.enum([
  'STATUTORY',
  'PRIVATE_NO_CONTRIB',
  'PRIVATE_WITH_CONTRIB',
]);
export type HealthInsuranceType = z.infer<typeof HealthInsuranceType>;
