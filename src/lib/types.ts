export enum SalaryPaymentPeriod {
  YEAR = 1,
  MONTH = 2,
  WEEK = 3,
  DAY = 4,
}

export enum TaxClass {
  I = 1,
  II = 2,
  III = 3,
  IV = 4,
  V = 5,
  VI = 6,
}

/**
 * Einkommensteuer-Tarifarten:
 * 1 = Grundtarif
 * 2 = Splittingverfahren
 */
export enum IncomeTaxTariffType {
  BASIC = 1,
  SPLITTING = 2,
}

/**
 * 0 = gesetzlich krankenversicherte Arbeitnehmer
 * 1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne Arbeitgeberzuschuss
 * 2 = ausschließlich privat krankenversicherte Arbeitnehmer mit Arbeitgeberzuschuss
 */
export enum HealthInsuranceType {
  STATUTORY = 0,
  PRIVATE_NO_CONTRIB = 1,
  PRIVATE_WITH_CONTRIB = 2,
}
