import { HealthInsuranceType } from "./types";

/**
 * UPVKVLZZ - Ermittlung des Anteils der berücksichtigten
 * Vorsorgeaufwendungen für den Lohnzahlungszeitraum
 */
export const calculateProportionOfPensionExpensesForSalaryPaymentPeriod =
  () => {
    // TODO
  };

/**
 * UPVKV - Ermittlung des Anteils der berücksichtigten
 * privaten Kranken- und Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 *
 * @param healthInsuranceType PKV - Art der Krankenversicherung
 * @param pensionLumpSumIntermediateValue2 VSP2 - Zwischenwert 2 bei der Berechnung der Vorsorgepauschale in Euro,
 * Cent (2 Dezimalstellen)
 * @param pensionLumpSum VSP3 - Vorsorgepauschale mit Teilbeträgen für die gesetzliche Kranken-
 * und soziale Pflegeversicherung nach fiktiven Beträgen oder ggf. für die private Basiskrankenversicherung und private Pflege-
 * Pflichtversicherung in Euro, Cent (2 Dezimalstellen)
 *
 * @return VKV - Jahreswert der berücksichtigten Beiträge zur privaten Basis-
 * Krankenversicherung und privaten Pflege-Pflichtversicherung (ggf.
 * auch die Mindestvorsorgepauschale) in Cent
 */
export const calculateAnnualValueOfPrivateHealthAndLongTermCareInsuranceContributions =
  (
    healthInsuranceType: HealthInsuranceType,
    pensionLumpSumIntermediateValue2: number,
    pensionLumpSum: number
  ) => {
    if (healthInsuranceType === HealthInsuranceType.STATUTORY) {
      return 0;
    } else {
      return Math.max(pensionLumpSumIntermediateValue2, pensionLumpSum) * 100;
    }
  };
