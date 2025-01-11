import { GermanFederalState } from '@/types/common';

import { calculateIncomeTax } from './income-tax';
import { UserInputs } from './income-tax/fields/UserInputs';

class TaxClient {
  static #instance: TaxClient;

  private constructor() {}

  public static get instance(): TaxClient {
    if (!TaxClient.#instance) {
      TaxClient.#instance = new TaxClient();
    }

    return TaxClient.#instance;
  }

  public setUserInputs() {
    const userInputs = UserInputs.instance;

    userInputs
      .setAF(0)
      .setAJAHR(0)
      .setALTER1(0)
      .setF(1)
      .setJFREIB(0)
      .setJHINZU(0)
      .setJRE4(0)
      .setJRE4ENT(0)
      .setJVBEZ(0)
      .setKRV(0)
      .setKVZ(2.5)
      .setLZZ(1)
      .setLZZFREIB(0)
      .setLZZHINZU(0)
      .setMBV(0)
      .setPKPV(0)
      .setPKV(0)
      .setPVA(0)
      .setPVS(0)
      .setPVZ(1)
      .setR(1)
      .setRE4(50000 * 100)
      .setSONSTB(0)
      .setSONSTENT(0)
      .setSTERBE(0)
      .setSTKL(1)
      .setVBEZ(0)
      .setVBEZM(0)
      .setVBEZS(0)
      .setVBS(0)
      .setVJAHR(0)
      .setZKF(0)
      .setZMVB(0);
  }

  public getChurchTax(
    incomeTax: number,
    federalState: GermanFederalState,
    isMemberOfChurch: boolean,
  ) {
    const churchTaxRate = [
      GermanFederalState.Bavaria,
      GermanFederalState.BadenWuerttemberg,
    ].includes(federalState)
      ? 0.08
      : 0.09;

    if (!isMemberOfChurch) {
      return 0;
    }

    const churchTax = incomeTax * churchTaxRate;

    return churchTax;
  }

  public getIncomeTax() {
    const { incomeTax, solidaritySurcharge } = calculateIncomeTax();

    return {
      incomeTax,
      solidaritySurcharge,
    };
  }
}

export default TaxClient.instance;
