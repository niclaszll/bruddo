'server only';

import { FederalState } from '@/types/common';
import { UserInputs } from '@/types/form';
import { HealthInsuranceType } from '@/types/income-tax';
import dayjs from 'dayjs';

import { InternalFieldsClient } from './clients/InternalFieldsClient';
import { UserInputsClient } from './clients/UserInputsClient';
import { setupMPARA } from './process/1_MPARA';
import { calculateMRE4JL } from './process/2_MRE4JL';
import { calculateMRE4 } from './process/3_MRE4';
import { calculateMRE4ABZ } from './process/5_MRE4ABZ';
import { calculateMBERECH } from './process/6_MBERECH';
import { calculateMSONST } from './process/17_MSONST';

class TaxService {
  static #instance: TaxService;

  private constructor() {}

  public static get instance(): TaxService {
    if (!TaxService.#instance) {
      TaxService.#instance = new TaxService();
    }

    return TaxService.#instance;
  }

  private setUserInputs(inputs: UserInputs) {
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
      .setLZZ(inputs.calculationPeriod)
      .setLZZFREIB(0)
      .setLZZHINZU(0)
      .setMBV(0)
      .setPKPV(0)
      .setPKV(HealthInsuranceType.enum.STATUTORY)
      .setPVA(this.calculatePVA(inputs.numChildren))
      .setPVS(inputs.federalState === FederalState.enum.SN ? 1 : 0)
      .setPVZ(inputs.nursingCareInsuranceSurcharge ? 1 : 0)
      .setR(inputs.churchTax ? 1 : 0)
      .setRE4(inputs.grossIncome * 100)
      .setSONSTB(0)
      .setSONSTENT(0)
      .setSTERBE(0)
      .setSTKL(inputs.taxClass)
      .setVBEZ(0)
      .setVBEZM(0)
      .setVBEZS(0)
      .setVBS(0)
      .setVJAHR(0)
      .setZKF(inputs.childAllowances)
      .setZMVB(0);
  }

  public calculateIncomeTax(inputs: UserInputs) {
    this.setUserInputs(inputs);

    const internalFields = InternalFieldsClient.instance;

    setupMPARA();
    calculateMRE4JL();

    internalFields.VBEZBSO = 0;

    calculateMRE4();
    calculateMRE4ABZ();
    calculateMBERECH();
    calculateMSONST();

    return {
      churchTaxAssessmentBasis: internalFields.BK / 100,
      BKS: internalFields.BKS,
      SOLZS: internalFields.SOLZS,
      STS: internalFields.STS,
      VKVLZZ: internalFields.VKVLZZ,
      VKVSONST: internalFields.VKVSONST,
      incomeTax: internalFields.LSTLZZ / 100,
      solidaritySurcharge: internalFields.SOLZLZZ / 100,
    };
  }

  private calculateAJAHR(birthDate: string): number {
    const birthDateParsed = dayjs(birthDate);

    const sixtyFourthBirthday = birthDateParsed.add(64, 'year');

    return sixtyFourthBirthday.year() + 1;
  }

  private calculateALTER1(birthDate: string): number {
    const birthDateParsed = dayjs(birthDate);

    const sixtyFourthBirthday = birthDateParsed.add(64, 'year');
    const startOfYear = dayjs(`${dayjs().year()}-01-01`);

    return sixtyFourthBirthday.isBefore(startOfYear) ? 1 : 0;
  }

  private calculatePVA(numChildren: number): number {
    if (numChildren <= 1) {
      return 0;
    }

    const res = Math.min(numChildren - 1, 4);
    console.log(res);
    return res;
  }
}

export default TaxService.instance;
