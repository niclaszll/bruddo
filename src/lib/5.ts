/**
 *
 * Ermittlung des Jahresarbeitslohns nach Abzug der
 * Freibeträge nach § 39b Absatz 2 Satz 3 und 4 EStG
 *
 * @param grossSalaryEuro ZRE4J - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
 * @param pensionPaymentsEuro ZVBEZJ - Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
 * @param pensionAllowance FVB - Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
 * @param proportionalTaxAllowanceForElderlyRetiredPersons ALTE - Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
 * @param taxAllowanceEuro JLFREIB - Auf einen Jahreslohn hochgerechneter LZZFREIB in Euro, Cent (2 Dezimalstellen)
 * @param additionalAmountEuro JLHINZU - Auf einen Jahreslohn hochgerechneter LZZHINZU in Euro, Cent (2 Dezimalstellen)
 */
export const calculateAnnualSalaryAfterDeductingAllowances = (
  grossSalaryEuro: number,
  pensionPaymentsEuro: number,
  pensionAllowance: number,
  proportionalTaxAllowanceForElderlyRetiredPersons: number,
  taxAllowanceEuro: number,
  additionalAmountEuro: number
) => {
  /**
   * ZRE4 - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent
   * (2 Dezimalstellen) nach Abzug der Freibeträge nach § 39b Absatz 2
   * Satz 3 und 4 EStG
   */
  const annualSalaryAfterDeductionOfAllowances = Math.max(
    grossSalaryEuro -
      pensionAllowance -
      proportionalTaxAllowanceForElderlyRetiredPersons -
      taxAllowanceEuro +
      additionalAmountEuro,
    0
  );

  /**
   * ZRE4VP - Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der
   * Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent (2 Dezimalstellen)
   */
  const annualSalaryAfterDeductionOfCompensation = grossSalaryEuro;

  /**
   * ZVBEZ Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in
   * Euro, Cent (2 Dezimalstellen)
   */
  const pensionPaymentsAfterDeductionOfAllowances = Math.max(
    pensionPaymentsEuro - pensionAllowance,
    0
  );

  return {
    annualSalaryAfterDeductionOfAllowances,
    annualSalaryAfterDeductionOfCompensation,
    pensionPaymentsAfterDeductionOfAllowances,
  };
};
