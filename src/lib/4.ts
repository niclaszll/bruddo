import taxData from "./ProportionalTaxAllowanceForElderlyRetiredPersons.json";

/**
 * Ermittlung des Altersentlastungsbetrags (§ 39b Absatz 2 Satz 3 EStG
 *
 * @param olderThan64 ALTER1 - `true`, wenn das 64. Lebensjahr vor Beginn des Kalenderjahres vollendet
 * wurde, in dem der Lohnzahlungszeitraum endet (§ 24a EStG), sonst `false`
 * @param yearFollowingThe65thBirthday AJAHR - Auf die Vollendung des 64. Lebensjahres folgendes Kalenderjahr
 * (erforderlich, wenn ALTER1=1)
 * @param grossSalaryEuro ZRE4J - Auf einen Jahreslohn hochgerechnetes RE4 in Euro, Cent (2 Dezimalstellen)
 * @param pensionPaymentsEuro ZVBEZJ - Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent (2 Dezimalstellen)
 *
 * @return {number} ALTE - Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
 */
export const calculateProportionalTaxAllowanceForElderlyRetiredPersons = (
  olderThan64: boolean,
  yearFollowingThe65thBirthday: number,
  grossSalaryEuro: number,
  pensionPaymentsEuro: number
) => {
  let result = 0;

  if (!olderThan64) {
    return result;
  }

  /**
   * K - Nummer der Tabellenwerte für Parameter bei Altersentlastungsbetrag
   */
  let tableIndex = 54;

  if (yearFollowingThe65thBirthday < 2006) {
    tableIndex = 1;
  } else if (yearFollowingThe65thBirthday < 2058) {
    tableIndex = yearFollowingThe65thBirthday - 2004;
  }

  /**
   * BMG - Bemessungsgrundlage für Altersentlastungsbetrag in Euro, Cent (2 Dezimalstellen)
   */
  const ageReliefAssessmentBasis = grossSalaryEuro - pensionPaymentsEuro;

  const allowancePercentage = taxData.find(
    (entry) => entry.index === tableIndex
  )?.allowancePercentage;

  if (allowancePercentage === undefined) {
    throw new Error(
      `No allowancePercentage data found for table index ${tableIndex}`
    );
  }

  result = Math.ceil(ageReliefAssessmentBasis * allowancePercentage);

  /**
   * HBALTE - Maximaler Altersentlastungsbetrag in Euro
   */
  const maxAllowance = taxData.find(
    (entry) => entry.index === tableIndex
  )?.maxAllowance;

  if (maxAllowance === undefined) {
    throw new Error(`No maxAllowance data found for table index ${tableIndex}`);
  }

  result = Math.min(result, maxAllowance);

  return result;
};
