import { calculateMSONST } from "../steps/17_MSONST";
import { setupMPARA } from "../steps/1_MPARA";
import { calculateMRE4JL } from "../steps/2_MRE4JL";
import { calculateMRE4 } from "../steps/3_MRE4";
import { calculateMRE4ABZ } from "../steps/5_MRE4ABZ";
import { calculateMBERECH } from "../steps/6_MBERECH";
import { InternalFields } from "./InternalFields";

export class IncomeTaxClient {
  static #instance: IncomeTaxClient;

  private constructor() {}

  public static get instance(): IncomeTaxClient {
    if (!IncomeTaxClient.#instance) {
      IncomeTaxClient.#instance = new IncomeTaxClient();
    }

    return IncomeTaxClient.#instance;
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
  }
}
