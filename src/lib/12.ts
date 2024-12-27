import {
  nursCareInsConRateEmployee,
  nursCareInsConRateEmployer,
  statHealthInsConAssCeil,
  statHealthInsConRateEmployee,
  statHealthInsConRateEmployer,
} from "./1";
import { HealthInsuranceType, TaxClass } from "./types";

/**
 * MVSP - Vorsorgepauschale (§ 39b Absatz 2 Satz 5 Nummer 3 EStG) Vergleichsberechnung zur Mindestvorsorgepauschale
 *
 * @param annualSalaryAfterDeductionOfCompensation ZRE4VP - Auf einen Jahreslohn hochgerechnetes RE4, ggf. nach Abzug der
 * Entschädigungen i.S.d. § 24 Nummer 1 EStG in Euro, Cent (2 Dezimalstellen)
 * @param healthInsuranceType PKV - Art der Krankenversicherung
 * @param taxClass STKL - Steuerklasse
 * @param privateHealthCareContributions PKPV - Dem Arbeitgeber mitgeteilte Beiträge des Versorgungsempfängers
 * für eine private Basiskranken- bzw. Pflege-Pflichtversicherung im Sinne des § 10 Absatz 1 Nummer 3 EStG in Cent;
 * der Wert ist unabhängig vom Lohnzahlungszeitraum immer als Monatsbetrag anzugeben
 * @param pensionLumpSumIntermediateValue1 VSP1 - Zwischenwert 1 bei der Berechnung der Vorsorgepauschale in Euro,
 * Cent (2 Dezimalstellen)
 *
 * @return {number} VSP - Vorsorgepauschale mit Teilbeträgen für die Rentenversicherung
 * sowie die gesetzliche Kranken- und soziale Pflegeversicherung nach
 * fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung
 * und private Pflege-Pflichtversicherung in Euro, Cent (2 Dezimalstellen)
 */
export const calculatePensionLumpSumComparatively = (
  annualSalaryAfterDeductionOfCompensation: number,
  healthInsuranceType: HealthInsuranceType,
  taxClass: TaxClass,
  privateHealthCareContributions: number,
  pensionLumpSumIntermediateValue1: number
) => {
  const updatedAnnualSalaryAfterDeductionOfCompensation = Math.min(
    annualSalaryAfterDeductionOfCompensation,
    statHealthInsConAssCeil
  );

  /**
   * VSP3 - Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken-
   * und soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung und private Pflege-
   * Pflichtversicherung in Euro, Cent (2 Dezimalstellen)
   */
  let pensionLumpSum3 = 0;
  if (healthInsuranceType > HealthInsuranceType.STATUTORY) {
    if (taxClass === 6) {
      pensionLumpSum3 = 0;
    } else {
      pensionLumpSum3 = (privateHealthCareContributions * 12) / 100;

      if (healthInsuranceType === HealthInsuranceType.PRIVATE_WITH_CONTRIB) {
        pensionLumpSum3 =
          pensionLumpSum3 -
          updatedAnnualSalaryAfterDeductionOfCompensation *
            (statHealthInsConRateEmployer + nursCareInsConRateEmployer);
      }
    }
  } else {
    pensionLumpSum3 =
      updatedAnnualSalaryAfterDeductionOfCompensation *
      (statHealthInsConRateEmployee + nursCareInsConRateEmployee);
  }

  return Math.ceil(pensionLumpSum3 + pensionLumpSumIntermediateValue1);
};
