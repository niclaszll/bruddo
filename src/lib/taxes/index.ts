import { FederalState, UserInputs } from '@/types/common';
import dayjs from 'dayjs';

import { calculateIncomeTax } from './income-tax';
import { UserInputsClient } from './income-tax/fields/UserInputs';

class TaxClient {
  static #instance: TaxClient;

  private constructor() {}

  public static get instance(): TaxClient {
    if (!TaxClient.#instance) {
      TaxClient.#instance = new TaxClient();
    }

    return TaxClient.#instance;
  }

  public setUserInputs(inputs: UserInputs) {
    const userInputs = UserInputsClient.instance;

    userInputs
      .setAF(0)
      .setAJAHR(this.calculateAJAHR(inputs.dob))
      .setALTER1(this.calculateALTER1(inputs.dob))
      .setF(1)
      .setJFREIB(0)
      .setJHINZU(0)
      .setJRE4(0)
      .setJRE4ENT(0)
      .setJVBEZ(0)
      .setKRV(0)
      .setKVZ(inputs.healthInsuranceAdditionalContribution)
      .setLZZ(1)
      .setLZZFREIB(0)
      .setLZZHINZU(0)
      .setMBV(0)
      .setPKPV(0)
      .setPKV(0)
      .setPVA(0)
      .setPVS(inputs.federalState === FederalState.enum.SN ? 1 : 0)
      .setPVZ(1)
      .setR(inputs.churchTax ? 1 : 0)
      .setRE4(inputs.grossIncome * 100)
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

  public getChurchTax(incomeTax: number, federalState: FederalState, isMemberOfChurch: boolean) {
    const churchTaxRate = ([FederalState.enum.BY, FederalState.enum.BW] as FederalState[]).includes(
      federalState,
    )
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

  private calculateAJAHR(birthDate: Date): number {
    const birthDateParsed = dayjs(birthDate);

    const sixtyFourthBirthday = birthDateParsed.add(64, 'year');

    return sixtyFourthBirthday.year() + 1;
  }

  private calculateALTER1(birthDate: Date): number {
    const birthDateParsed = dayjs(birthDate);

    const sixtyFourthBirthday = birthDateParsed.add(64, 'year');
    const startOfYear = dayjs(`${dayjs().year()}-01-01`);

    return sixtyFourthBirthday.isBefore(startOfYear) ? 1 : 0;
  }
}

export default TaxClient.instance;
