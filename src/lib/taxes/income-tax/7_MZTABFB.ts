import { TaxClass } from '@/types/common';
import { IncomeTaxTariffType } from '@/types/income-tax';
import { roundUpToFullEuro } from '@/util/format';

import { InternalFieldsClient } from './fields/InternalFields';
import { UserInputsClient } from './fields/UserInputs';

/**
 * MZTABFB - Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
 */
export const calculateMZTABFB = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  /**
   * Mögliche Begrenzung des Zuschlags zum Versorgungsfreibetrag, und
   * Festlegung und Begrenzung Werbungskosten-Pauschbetrag für Versorgungsbezüge
   */
  internalFields.ANP = 0;

  if (internalFields.ZVBEZ >= 0) {
    internalFields.FVBZ = Math.min(internalFields.ZVBEZ, internalFields.FVBZ);
  }

  // STKL < VI
  if (userInputs.STKL !== TaxClass.enum.VI) {
    if (internalFields.ZVBEZ > 0) {
      if (internalFields.ZVBEZ - internalFields.FVBZ < 102) {
        internalFields.ANP = roundUpToFullEuro(internalFields.ZVBEZ - internalFields.FVBZ);
      } else {
        internalFields.ANP = 102;
      }
    }
  } else {
    internalFields.FVBZ = 0;
    internalFields.FVBZSO = 0;
  }

  /**
   * Festlegung Arbeitnehmer-Pauschbetrag für aktiven Lohn
   * mit möglicher Begrenzung
   */
  if (userInputs.STKL !== TaxClass.enum.VI && internalFields.ZRE4 > internalFields.ZVBEZ) {
    if (internalFields.ZRE4 - internalFields.ZVBEZ < 1230) {
      internalFields.ANP = roundUpToFullEuro(
        internalFields.ANP + internalFields.ZRE4 - internalFields.ZVBEZ,
      );
    } else {
      internalFields.ANP = internalFields.ANP + 1230;
    }
  }

  internalFields.KZTAB = IncomeTaxTariffType.enum.BASIC;

  internalFields.SAP = userInputs.STKL !== TaxClass.enum.VI ? 36 : 0;

  // not part of plan, but needs a default
  internalFields.EFA = 0;

  switch (userInputs.STKL) {
    case TaxClass.enum.I:
      internalFields.KFB = userInputs.ZKF * 9540;
      break;
    case TaxClass.enum.II:
      internalFields.KFB = userInputs.ZKF * 9540;
      internalFields.EFA = 4260;
      break;
    case TaxClass.enum.III:
      internalFields.KFB = userInputs.ZKF * 9540;
      internalFields.KZTAB = IncomeTaxTariffType.enum.SPLITTING;
      break;
    case TaxClass.enum.IV:
      internalFields.KFB = userInputs.ZKF * 4770;
      break;
    case TaxClass.enum.V:
    case TaxClass.enum.VI:
      internalFields.KFB = 0;
      break;
  }

  /**
   * Berechnung der Tabellenfreibeträge ohne Freibeträge
   * für Kinder für die Lohnsteuerberechnung
   */
  internalFields.ZTABFB =
    internalFields.EFA + internalFields.ANP + internalFields.SAP + internalFields.FVBZ;
};
