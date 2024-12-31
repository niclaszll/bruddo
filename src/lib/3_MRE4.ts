import { calculateProportionalTaxAllowanceForElderlyRetiredPersons } from "./4_MRE4ALTE";
import { InternalFields } from "./InternalFields";
import { SalaryPaymentPeriod } from "./types";
import { UserInputs } from "./UserInputs";

/**
 * MRE4 - Ermittlung der Freibeträge nach § 39b Absatz 2 Satz 3 EStG
 */
export const calculateAllowances = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;

  if (internalFields.ZVBEZJ === 0) {
    internalFields.FVBZ = 0;
    internalFields.FVB = 0;
    internalFields.FVBZSO = 0;
    internalFields.FVBSO = 0;
  } else {
    if (userInputs.VJAHR < 2006) {
      internalFields.J = 1;
    } else if (userInputs.VJAHR < 2058) {
      internalFields.J = userInputs.VJAHR - 2004;
    } else {
      internalFields.J = 54;
    }

    if (userInputs.LZZ === SalaryPaymentPeriod.YEAR) {
      internalFields.VBEZB =
        userInputs.VBEZM * userInputs.ZMVB + userInputs.VBEZS;
      internalFields.HFVB = Math.ceil(
        (internalFields.getTAB2(internalFields.J) / 12) * userInputs.ZMVB
      );
      internalFields.FVBZ = Math.ceil(
        (internalFields.getTAB3(internalFields.J) / 12) * userInputs.ZMVB
      );
    } else {
      internalFields.VBEZB = userInputs.VBEZM * 12 + userInputs.VBEZS;
      internalFields.HFVB = internalFields.getTAB2(internalFields.J);
      internalFields.FVBZ = internalFields.getTAB3(internalFields.J);
    }

    internalFields.FVB = Math.ceil(
      (internalFields.VBEZB * internalFields.getTAB1(internalFields.J)) / 100
    );
    internalFields.FVB = Math.min(internalFields.FVB, internalFields.HFVB);
    internalFields.FVB = Math.min(internalFields.FVB, internalFields.ZVBEZJ);

    internalFields.FVBSO = Math.ceil(
      internalFields.FVB +
        (internalFields.VBEZBSO * internalFields.getTAB1(internalFields.J)) /
          100
    );
    internalFields.FVBSO = Math.min(
      internalFields.FVBSO,
      internalFields.getTAB2(internalFields.J)
    );

    internalFields.HFVBZSO =
      (internalFields.VBEZB + internalFields.VBEZBSO) / 100 -
      internalFields.FVBSO;

    internalFields.FVBZSO = Math.ceil(
      internalFields.FVBZ + internalFields.VBEZBSO / 100
    );
    internalFields.FVBZSO = Math.ceil(
      Math.min(internalFields.FVBZSO, internalFields.HFVBZSO)
    );

    internalFields.FVBZSO = Math.min(
      internalFields.FVBZSO,
      internalFields.getTAB3(internalFields.J)
    );

    internalFields.HFVBZ = internalFields.VBEZB / 100 - internalFields.FVB;
    internalFields.FVBZ = Math.ceil(
      Math.min(internalFields.FVBZ, internalFields.HFVBZ)
    );

    // MRE4ALTE
    calculateProportionalTaxAllowanceForElderlyRetiredPersons();
  }
};
