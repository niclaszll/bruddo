import { calculateShareOfAnnualAmountsForLZZ } from "./16_UPANTEIL";
import { InternalFields } from "./InternalFields";
import { HealthInsuranceType } from "./types";
import { UserInputs } from "./UserInputs";

/**
 * UPVKVLZZ - Ermittlung des Anteils der berücksichtigten
 * Vorsorgeaufwendungen für den Lohnzahlungszeitraum
 */
export const calculateUPVKVLZZ = () => {
  const internalFields = InternalFields.instance;

  // UPVKV
  calculateAnnualValueOfPrivateHealthAndLongTermCareInsuranceContributions();

  internalFields.JW = internalFields.VKV;

  // UPANTEIL
  calculateShareOfAnnualAmountsForLZZ();
  internalFields.VKVLZZ = internalFields.ANTEIL1;
};

/**
 * UPVKV - Ermittlung des Anteils der berücksichtigten
 * privaten Kranken- und Pflegeversicherungsbeiträge für den Lohnzahlungszeitraum
 */
export const calculateAnnualValueOfPrivateHealthAndLongTermCareInsuranceContributions =
  () => {
    const internalFields = InternalFields.instance;
    const userInputs = UserInputs.instance;

    if (userInputs.PKV > HealthInsuranceType.STATUTORY) {
      internalFields.VKV = 0;
    } else {
      internalFields.VKV =
        Math.max(internalFields.VSP2, internalFields.VSP3) * 100;
    }
  };
