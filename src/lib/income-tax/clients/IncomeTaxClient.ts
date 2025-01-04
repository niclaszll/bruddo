import { calculateMSONST } from "../steps/17_MSONST";
import { setupMPARA } from "../steps/1_MPARA";
import { calculateMRE4JL } from "../steps/2_MRE4JL";
import { calculateMRE4 } from "../steps/3_MRE4";
import { calculateMRE4ABZ } from "../steps/5_MRE4ABZ";
import { calculateMBERECH } from "../steps/6_MBERECH";
import { InternalFields } from "./InternalFields";
import { UserInputs } from "./UserInputs";

export class IncomeTaxClient {
  static #instance: IncomeTaxClient;

  private constructor() {}

  public static get instance(): IncomeTaxClient {
    if (!IncomeTaxClient.#instance) {
      IncomeTaxClient.#instance = new IncomeTaxClient();
    }

    return IncomeTaxClient.#instance;
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
      .setKVZ(2.45)
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
      .setRE4(100000 * 100)
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

  public calculateIncomeTax() {
    const internalFields = InternalFields.instance;

    setupMPARA();
    calculateMRE4JL();

    internalFields.VBEZBSO = 0;

    calculateMRE4();
    calculateMRE4ABZ();
    calculateMBERECH();
    calculateMSONST();

    return {
      BK: internalFields.BK,
      BKS: internalFields.BKS,
      LSTLZZ: internalFields.LSTLZZ,
      SOLZLZZ: internalFields.SOLZLZZ,
      SOLZS: internalFields.SOLZS,
      STS: internalFields.STS,
      VKVLZZ: internalFields.VKVLZZ,
      VKVSONST: internalFields.VKVSONST,
    };
  }
}
