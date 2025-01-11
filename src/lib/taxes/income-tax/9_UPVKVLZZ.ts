import { HealthInsuranceType } from '@/types/income-tax';

import { calculateUPANTEIL } from './16_UPANTEIL';
import { InternalFields } from './fields/InternalFields';
import { UserInputs } from './fields/UserInputs';

/**
 * UPVKVLZZ - Ermittlung des Anteils der berücksichtigten
 * Vorsorgeaufwendungen für den Lohnzahlungszeitraum
 */
export const calculateUPVKVLZZ = () => {
  const internalFields = InternalFields.instance;

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
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (userInputs.PKV > HealthInsuranceType.STATUTORY) {
    internalFields.VKV = 0;
  } else {
    internalFields.VKV = Math.max(internalFields.VSP2, internalFields.VSP3) * 100;
  }
};
