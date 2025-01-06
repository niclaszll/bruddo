import { InternalFields } from "./fields/InternalFields";

/**
 * MRE4ABZ - Ermittlung des Jahresarbeitslohns nach Abzug der
 * Freibeträge nach § 39b Absatz 2 Satz 3 und 4 EStG
 */
export const calculateMRE4ABZ = () => {
  const internalFields = InternalFields.instance;

  internalFields.ZRE4 = Math.max(
    internalFields.ZRE4J -
      internalFields.FVB -
      internalFields.ALTE -
      internalFields.JLFREIB +
      internalFields.JLHINZU,
    0
  );

  internalFields.ZRE4VP = internalFields.ZRE4J;
  internalFields.ZVBEZ = Math.max(
    internalFields.ZVBEZJ - internalFields.FVB,
    0
  );
};
