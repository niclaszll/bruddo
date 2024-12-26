import { statPenInsConAssCeil, statPenInsConRate } from "./1";
import { TaxClass } from "./types";

/**
 * Berechnung der Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 und Absatz 4 EStG)
 *
 * @param hasStatPenIns KRV - Merker für die Vorsorgepauschale
 * @param annualSalaryAfterDeductionOfCompensation ZRE4VP - Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der
 * Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent (2 Dezimalstellen)
 * @param taxClass STKL - Steuerklasse
 */
export const calculatePensionLumpSum = (
  hasStatPenIns: boolean,
  annualSalaryAfterDeductionOfCompensation: number,
  taxClass: TaxClass
) => {
  let pensionLumpSumIntermediateValue1 = 0;

  let updatedAnnualSalaryAfterDeductionOfCompensation =
    annualSalaryAfterDeduction;

  if (hasStatPenIns) {
    if (annualSalaryAfterDeductionOfCompensation > statPenInsConAssCeil) {
      updatedAnnualSalaryAfterDeductionOfCompensation = statPenInsConAssCeil;
    }
    pensionLumpSumIntermediateValue1 =
      updatedAnnualSalaryAfterDeductionOfCompensation * statPenInsConRate;
  }

  let pensionLumpSumIntermediateValue2 =
    0.12 * updatedAnnualSalaryAfterDeductionOfCompensation;

  /**
   * VHB - Höchstbetrag der Mindestvorsorgepauschale für die Kranken- und
   * Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  let healthCareLumpSumMax = taxClass === TaxClass.III ? 3000 : 1900;

  pensionLumpSumIntermediateValue2 = Math.min(
    pensionLumpSumIntermediateValue2,
    healthCareLumpSumMax
  );

  /**
   * VSPN Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung
   * sowie der Mindestvorsorgepauschale für die Kranken- und
   * Pflegeversicherung in Euro, Cent (2 Dezimalstellen)
   */
  const pensionLumpSumMin = Math.ceil(
    pensionLumpSumIntermediateValue1 + pensionLumpSumIntermediateValue2
  );

  // TODO: MVSP
  let pensionLumpSum = 0;

  return Math.max(pensionLumpSumMin, pensionLumpSum);
};
