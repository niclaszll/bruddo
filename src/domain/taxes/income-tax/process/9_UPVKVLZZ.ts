import { HealthInsuranceType } from '@/types/income-tax';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';
import { calculateUPANTEIL } from './16_UPANTEIL';

/**
 * UPVKVLZZ - Ermittlung des Anteils der berücksichtigten
 * Vorsorgeaufwendungen für den Lohnzahlungszeitraum
 */
export const calculateUPVKVLZZ = () => {
  const internalFields = InternalFieldsClient.instance;

  // UPVKV
  calculateUPVKV();

  internalFields.JW = internalFields.VKV;

  // UPANTEIL
  calculateUPANTEIL();
  internalFields.VKVLZZ = internalFields.ANTEIL1;
};

/**
 * UPVKV - Ermittlung des Anteils der berücksichtigten
 * privaten Kranken- und Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 */
export const calculateUPVKV = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  if (
    userInputs.PKV === HealthInsuranceType.enum.PRIVATE_NO_CONTRIB ||
    userInputs.PKV === HealthInsuranceType.enum.PRIVATE_WITH_CONTRIB
  ) {
    internalFields.VKV = 0;
  } else {
    internalFields.VKV = Math.max(internalFields.VSP2, internalFields.VSP3) * 100;
  }
};
