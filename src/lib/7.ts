import { IncomeTaxTariffType, TaxClass } from "./types";

/**
 * Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
 *
 * @param pensionPaymentsAfterDeductionOfAllowances ZVBEZ - Auf einen Jahreslohn hochgerechnetes VBEZ abzüglich FVB in
 * Euro, Cent (2 Dezimalstellen)
 * @param pensionAllowanceAddCon FVBZ - Zuschlag zum Versorgungsfreibetrag in Euro
 * @param taxClass STKL - Steuerklasse
 * @param pensionAllowanceAddConOtherIncome FVBZSO - Zuschlag zum Versorgungsfreibetrag in Euro für die Berechnung der
 * Lohnsteuer beim sonstigen Bezug
 * @param grossSalaryEuro ZRE4J - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
 * @param numberAllowancesChildren ZKF - Zahl der Freibeträge für Kinder (eine Dezimalstelle, nur bei
 * Steuerklassen I, II, III und IV)
 */
export const calculateFixedTableAllowances = (
  pensionPaymentsAfterDeductionOfAllowances: number,
  pensionAllowanceAddCon: number,
  pensionAllowanceAddConOtherIncome: number,
  taxClass: TaxClass,
  grossSalaryEuro: number,
  numberAllowancesChildren: number
) => {
  /**
   * 1. Mögliche Begrenzung des Zuschlags zum Versorgungsfreibetrag, und
   * Festlegung und Begrenzung Werbungskosten-Pauschbetrag für Versorgungsbezüge
   */

  /**
   * ANP - Arbeitnehmer-Pauschbetrag/Werbungskosten-Pauschbetrag in Euro
   */
  let employeeLumpSum = 0;

  let updatedPensionAllowanceAddCon = pensionAllowanceAddCon;
  let updatedPensionAllowanceAddConOtherIncome =
    pensionAllowanceAddConOtherIncome;

  if (
    pensionPaymentsAfterDeductionOfAllowances >= 0 &&
    pensionPaymentsAfterDeductionOfAllowances < pensionAllowanceAddCon
  ) {
    updatedPensionAllowanceAddCon = pensionPaymentsAfterDeductionOfAllowances;
  }

  if (taxClass < TaxClass.VI) {
    updatedPensionAllowanceAddCon = 0;
    updatedPensionAllowanceAddConOtherIncome = 0;
  } else if (pensionPaymentsAfterDeductionOfAllowances > 0) {
    if (
      pensionPaymentsAfterDeductionOfAllowances - pensionAllowanceAddCon <
      102
    ) {
      employeeLumpSum = Math.ceil(
        pensionPaymentsAfterDeductionOfAllowances - pensionAllowanceAddCon
      );
    } else {
      employeeLumpSum = 102;
    }
  }

  /**
   * 2. Festlegung Arbeitnehmer-Pauschbetrag für aktiven Lohn
   * mit möglicher Begrenzung
   */
  if (
    taxClass >= TaxClass.VI &&
    grossSalaryEuro > pensionPaymentsAfterDeductionOfAllowances
  ) {
    if (grossSalaryEuro - pensionPaymentsAfterDeductionOfAllowances < 1230) {
      employeeLumpSum = Math.ceil(
        employeeLumpSum +
          grossSalaryEuro -
          pensionPaymentsAfterDeductionOfAllowances
      );
    } else {
      employeeLumpSum = employeeLumpSum + 1230;
    }
  }

  /**
   * KZTAB - Kennzahl für die Einkommensteuer-Tarifarten
   */
  let incomeTaxTariffType = IncomeTaxTariffType.BASIC;
  /**
   * SAP - Sonderausgaben-Pauschbetrag in Euro
   */
  let specialExpensesLumpSum = 0;

  /**
   * KFB - Summe der Freibeträge für Kinder in Euro
   */
  let totalAllowancesChildren = 0;

  /**
   * EFA - Entlastungsbetrag für Alleinerziehende in Euro
   */
  let singleParentReliefAmount = 0;

  if (taxClass !== TaxClass.VI) {
    specialExpensesLumpSum = 36;
  }

  switch (taxClass) {
    case TaxClass.I:
      totalAllowancesChildren = numberAllowancesChildren * 9540;
      break;
    case TaxClass.II:
      totalAllowancesChildren = numberAllowancesChildren * 9540;
      singleParentReliefAmount = 4260;
      break;
    case TaxClass.III:
      totalAllowancesChildren = numberAllowancesChildren * 9540;
      incomeTaxTariffType = IncomeTaxTariffType.SPLITTING;
      break;
    case TaxClass.IV:
      totalAllowancesChildren = numberAllowancesChildren * 4770;
      break;
  }

  /**
   * Berechnung der Tabellenfreibeträge ohne Freibeträge
   * für Kinder für die Lohnsteuerberechnung
   */
  return (
    singleParentReliefAmount +
    employeeLumpSum +
    specialExpensesLumpSum +
    pensionAllowanceAddCon
  );
};
