/**
 * Ermittlung der Freibeträge nach § 39b Absatz 2 Satz 3 EStG
 *
 * @param {number} pensionPaymentsEuro ZVBEZJ - Auf einen Jahreslohn hochgerechnetes VBEZ in Euro, Cent
 * (2 Dezimalstellen)
 * @param {number} pensionStartYear VJAHR - Jahr, in dem der Versorgungsbezug erstmalig gewährt wurde;
 * werden mehrere Versorgungsbezüge gezahlt, wird aus
 * Vereinfachungsgründen für die Berechnung das Jahr des ältesten
 * erstmaligen Bezugs herangezogen; auf die Möglichkeit der
 * getrennten Abrechnung verschiedenartiger Bezüge (§ 39e Absatz 5a
 * EStG) wird im Übrigen verwiesen
 */
export const calculateAllowances = (
  pensionPaymentsEuro: number,
  pensionStartYear: number
) => {
  /**
   * FVBZ - Zuschlag zum Versorgungsfreibetrag in Euro
   */
  const pensionAllowanceAddCon = 0;
  /**
   * FVB - Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen)
   */
  const pensionAllowance = 0;
  /**
   * FVBZSO - Zuschlag zum Versorgungsfreibetrag in Euro für die Berechnung der
   * Lohnsteuer beim sonstigen Bezug
   */
  const pensionAllowanceAddConOtherIncome = 0;
  /**
   * FVBSO - Versorgungsfreibetrag in Euro, Cent (2 Dezimalstellen) für die
   * Berechnung der Lohnsteuer für den sonstigen Bezug
   */
  const pensionAllowanceOtherIncome = 0;

  if (pensionPaymentsEuro > 0) {
    let pensionTableNumber = 54;
    if (pensionStartYear < 2006) {
      pensionTableNumber = 1;
    } else if (pensionStartYear < 2058) {
      pensionTableNumber = pensionStartYear - 2004;
    }
    // TODO: start from <LZZ = 1>
  }

  return {
    pensionAllowanceAddCon,
    pensionAllowance,
    pensionAllowanceAddConOtherIncome,
    pensionAllowanceOtherIncome,
  };
};
