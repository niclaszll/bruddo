import { FederalState } from '@/types/common';
import { roundToFullCent } from '@/util/format';

class ChurchTaxService {
  static #instance: ChurchTaxService;

  private constructor() {}

  public static get instance(): ChurchTaxService {
    if (!ChurchTaxService.#instance) {
      ChurchTaxService.#instance = new ChurchTaxService();
    }

    return ChurchTaxService.#instance;
  }

  public calculateChurchTax(
    incomeTax: number,
    federalState: FederalState,
    isMemberOfChurch: boolean,
  ) {
    const churchTaxRate = ([FederalState.enum.BY, FederalState.enum.BW] as FederalState[]).includes(
      federalState,
    )
      ? 0.08
      : 0.09;

    if (!isMemberOfChurch) {
      return 0;
    }

    const churchTax = roundToFullCent(incomeTax * churchTaxRate);

    return churchTax;
  }
}

export default ChurchTaxService.instance;
