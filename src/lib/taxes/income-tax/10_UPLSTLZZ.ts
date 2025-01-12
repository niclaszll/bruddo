import { calculateUPANTEIL } from './16_UPANTEIL';
import { InternalFieldsClient } from './fields/InternalFields';

/**
 * UPLSTLZZ - Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
 */
export const calculateUPLSTLZZ = () => {
  const internalFields = InternalFieldsClient.instance;

  internalFields.JW = internalFields.LSTJAHR * 100;

  // UPANTEIL
  calculateUPANTEIL();

  internalFields.LSTLZZ = internalFields.ANTEIL1;
};
