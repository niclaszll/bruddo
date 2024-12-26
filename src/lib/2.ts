import { SalaryPaymentPeriod } from "./types";

/**
 *
 * Ermittlung des Jahresarbeitslohns nach § 39b Absatz 2 Satz 2 EStG
 *
 * @param {number} grossSalary RE4 - Steuerpflichtiger Arbeitslohn für den Lohnzahlungszeitraum vor
 * Berücksichtigung des Versorgungsfreibetrags und des Zuschlags
 * zum Versorgungsfreibetrag, des Altersentlastungsbetrags und des
 * als elektronisches Lohnsteuerabzugsmerkmal festgestellten oder in
 * der Bescheinigung für den Lohnsteuerabzug 2025 für den
 * Lohnzahlungszeitraum eingetragenen Freibetrags bzw.
 * Hinzurechnungsbetrags in Cent
 * @param {number} pensionPayments VBEZ - In RE4 enthaltene Versorgungsbezüge in Cent (ggf. 0) ggf. unter
 * Berücksichtigung einer geänderten Bemessungsgrundlage nach
 * § 19 Absatz 2 Satz 10 und 11 EStG
 * @param {number} taxAllowance LZZFREIB - Der als elektronisches Lohnsteuerabzugsmerkmal für den
 * Arbeitgeber nach § 39e EStG festgestellte oder in der Bescheinigung
 * für den Lohnsteuerabzug 2025 eingetragene Freibetrag für den
 * Lohnzahlungszeitraum in Cent
 * @param {number} additionalAmount LZZHINZU - Der als elektronisches Lohnsteuerabzugsmerkmal für den
 * Arbeitgeber nach § 39e EStG festgestellte oder in der Bescheinigung
 * für den Lohnsteuerabzug 2025 eingetragene Hinzurechnungsbetrag
 * für den Lohnzahlungszeitraum in Cent
 * @param {boolean} useFactorMethod AF - `true`, wenn die Anwendung des Faktorverfahrens gewählt wurde (nur in
 * Steuerklasse IV)
 */
export const calculateAnnualSalaryAndAllowances = (
  salaryPaymentPeriod: SalaryPaymentPeriod,
  grossSalary: number,
  pensionPayments: number,
  taxAllowance: number,
  additionalAmount: number,
  useFactorMethod: boolean
) => {
  /**
   * Factors to multiply input values with to get yearly values
   */
  const salaryPaymentPeriodFactors = {
    [SalaryPaymentPeriod.YEAR]: 1,
    [SalaryPaymentPeriod.MONTH]: 12,
    [SalaryPaymentPeriod.WEEK]: 360 / 7,
    [SalaryPaymentPeriod.DAY]: 360,
  };
  /**
   * ZRE4J - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
   */
  const grossSalaryEuro =
    Math.trunc(grossSalary * salaryPaymentPeriodFactors[salaryPaymentPeriod]) /
    100;
  /**
   * ZVBEZJ - Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
   */
  const pensionPaymentsEuro =
    Math.trunc(
      pensionPayments * salaryPaymentPeriodFactors[salaryPaymentPeriod]
    ) / 100;
  /**
   * JLFREIB - Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent (2 Dezimalstellen)
   */
  const taxAllowanceEuro =
    Math.trunc(taxAllowance * salaryPaymentPeriodFactors[salaryPaymentPeriod]) /
    100;
  /**
   * JLHINZU - Auf einen Jahreslohn hochgerechneter LZZHINZU in Euro, Cent (2 Dezimalstellen)
   */
  const additionalAmountEuro =
    (Math.trunc(additionalAmount) *
      salaryPaymentPeriodFactors[salaryPaymentPeriod]) /
    100;
  /**
   * F - eingetragener Faktor mit drei Nachkommastellen
   */
  const factor = useFactorMethod ? null : 1;

  return {
    grossSalaryEuro,
    pensionPaymentsEuro,
    taxAllowanceEuro,
    additionalAmountEuro,
    factor,
  };
};
