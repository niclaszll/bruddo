import { InternalFields } from "./InternalFields";

/**
 * UPLSTLZZ - Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
 */
export const calculateAnnualIncomeTaxShare = () => {
  const internalFields = InternalFields.instance;

  internalFields.JW = internalFields.LSTJAHR * 100;

  // TODO: UPANTEIL

  internalFields.LSTLZZ = internalFields.ANTEIL1;
};
