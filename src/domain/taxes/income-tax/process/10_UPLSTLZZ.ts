import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { calculateUPANTEIL } from './16_UPANTEIL';

/**
 * UPLSTLZZ - Ermittlung des Anteils der Jahreslohnsteuer für den Lohnzahlungszeitraum
 */
export const calculateUPLSTLZZ = () => {
  const internalFields = InternalFieldsClient.instance;

  internalFields.JW = internalFields.LSTJAHR * 100;

  calculateUPANTEIL();

  internalFields.LSTLZZ = internalFields.ANTEIL1;
};
