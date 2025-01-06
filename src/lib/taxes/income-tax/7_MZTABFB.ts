import { roundUpToFullEuro } from "@/util/format";
import { InternalFields } from "./fields/InternalFields";
import { IncomeTaxTariffType, TaxClass } from "@/types/income-tax";
import { UserInputs } from "./fields/UserInputs";

/**
 * MZTABFB - Ermittlung der festen Tabellenfreibeträge (ohne Vorsorgepauschale)
 */
export const calculateMZTABFB = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  /**
   * Mögliche Begrenzung des Zuschlags zum Versorgungsfreibetrag, und
   * Festlegung und Begrenzung Werbungskosten-Pauschbetrag für Versorgungsbezüge
   */
  internalFields.ANP = 0;

  if (internalFields.ZVBEZ >= 0) {
    internalFields.FVBZ = Math.min(internalFields.ZVBEZ, internalFields.FVBZ);
  }

  if (userInputs.STKL < TaxClass.VI) {
    if (internalFields.ZVBEZ > 0) {
      if (internalFields.ZVBEZ - internalFields.FVBZ < 102) {
        internalFields.ANP = roundUpToFullEuro(
          internalFields.ZVBEZ - internalFields.FVBZ
        );
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
  if (
    userInputs.STKL < TaxClass.VI &&
    internalFields.ZRE4 > internalFields.ZVBEZ
  ) {
    if (internalFields.ZRE4 - internalFields.ZVBEZ < 1230) {
      internalFields.ANP = roundUpToFullEuro(
        internalFields.ANP + internalFields.ZRE4 - internalFields.ZVBEZ
      );
    } else {
      internalFields.ANP = internalFields.ANP + 1230;
    }
  }

  internalFields.KZTAB = IncomeTaxTariffType.BASIC;

  internalFields.SAP = userInputs.STKL !== TaxClass.VI ? 36 : 0;

  // not part of plan, but needs a default
  internalFields.EFA = 0;

  switch (userInputs.STKL) {
    case TaxClass.I:
      internalFields.KFB = userInputs.ZKF * 9540;
      break;
    case TaxClass.II:
      internalFields.KFB = userInputs.ZKF * 9540;
      internalFields.EFA = 4260;
      break;
    case TaxClass.III:
      internalFields.KFB = userInputs.ZKF * 9540;
      internalFields.KZTAB = IncomeTaxTariffType.SPLITTING;
      break;
    case TaxClass.IV:
      internalFields.KFB = userInputs.ZKF * 4770;
      break;
    case TaxClass.V:
    case TaxClass.VI:
      internalFields.KFB = 0;
      break;
  }

  /**
   * Berechnung der Tabellenfreibeträge ohne Freibeträge
   * für Kinder für die Lohnsteuerberechnung
   */
  internalFields.ZTABFB =
    internalFields.EFA +
    internalFields.ANP +
    internalFields.SAP +
    internalFields.FVBZ;
};
