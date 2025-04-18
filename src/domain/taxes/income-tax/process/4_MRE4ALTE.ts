import { roundUpToFullEuro } from '@/util/format';

import { InternalFieldsClient } from '../clients/InternalFieldsClient';
import { UserInputsClient } from '../clients/UserInputsClient';

/**
 * MRE4ALTE - Ermittlung des Altersentlastungsbetrags (§ 39b Absatz 2 Satz 3 EStG
 */
export const calculateMRE4ALTE = () => {
  const internalFields = InternalFieldsClient.instance;
  const userInputs = UserInputsClient.instance;

  if (userInputs.ALTER1 === 0) {
    internalFields.ALTE = 0;
  } else {
    if (userInputs.AJAHR < 2006) {
      internalFields.K = 1;
    } else if (userInputs.AJAHR < 2058) {
      internalFields.K = userInputs.AJAHR - 2004;
    } else {
      internalFields.K = 54;
    }

    internalFields.BMG = internalFields.ZRE4J - internalFields.ZVBEZJ;

    internalFields.ALTE = roundUpToFullEuro(
      internalFields.BMG * internalFields.getTAB4(internalFields.K),
    );

    internalFields.HBALTE = internalFields.getTAB5(internalFields.K);
    internalFields.ALTE = Math.min(internalFields.ALTE, internalFields.HBALTE);
  }
};
