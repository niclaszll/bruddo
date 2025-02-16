'server only';

import { FederalState } from '@/types/common';
import { roundToFullCent } from '@/util/format';

class ChurchTaxService {
  static #instance: ChurchTaxService;

  private constructor() {}

  public static get instance(): ChurchTaxService {
    return (this.#instance ??= new ChurchTaxService());
  }

  public calculateChurchTax(
    incomeTax: number,
    federalState: FederalState,
    isMemberOfChurch: boolean,
  ) {
    if (!isMemberOfChurch) return 0;

    const isHigherRate = ([FederalState.enum.BY, FederalState.enum.BW] as FederalState[]).includes(
      federalState,
    );
    const churchTaxRate = isHigherRate ? 0.08 : 0.09;

    return roundToFullCent(incomeTax * churchTaxRate);
  }
}

export default ChurchTaxService.instance;
