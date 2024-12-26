import { IncomeTaxTariffType, TaxClass } from "./types";

/**
 *
 * @param taxableIncome ZVE - Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)
 * @param incomeTaxTariffType KZTAB - Kennzahl für die Einkommensteuer-Tarifarten
 * @param taxClass STKL - Steuerklasse
 */
export const calculateAnnualWageTax = (
  taxableIncome: number,
  incomeTaxTariffType: IncomeTaxTariffType,
  taxClass: TaxClass,
) => {
  // TODO: UPEVP - Ermittlung der Vorsorgepauschale
  /**
   * UPMLST
   */

  /**
   * ZVE Zu versteuerndes Einkommen in Euro, Cent (2 Dezimalstellen)
   */
  let updatedTaxableIncome = 0;
  /**
   * X Zu versteuerndes Einkommen gem. § 32a Absatz 1 und 5 EStG in
   * Euro, Cent (2 Dezimalstellen)
   */
  let taxableIncomeX = 0;

  if (taxableIncome >= 1) {
    taxableIncomeX = Math.floor(taxableIncome / incomeTaxTariffType);
  }

  if (taxClass < TaxClass.VI) {
    // UPTAB24
  } else {
    // MST5-6 
  }
};
