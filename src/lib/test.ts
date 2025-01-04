import { IncomeTaxClient } from "./income-tax/clients/IncomeTaxClient";
import { InternalFields } from "./income-tax/clients/InternalFields";
import { UserInputs } from "./income-tax/clients/UserInputs";

export const testCalculateIncomeTaxFor2025 = () => {
  const internalFields = InternalFields.instance;
  const userInputs = UserInputs.instance;
  const incomeTaxClient = IncomeTaxClient.instance;

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

  incomeTaxClient.calculateIncomeTax();

  const results = {
    BK: internalFields.BK,
    BKS: internalFields.BKS,
    LSTLZZ: internalFields.LSTLZZ,
    SOLZLZZ: internalFields.SOLZLZZ,
    SOLZS: internalFields.SOLZS,
    STS: internalFields.STS,
    VKVLZZ: internalFields.VKVLZZ,
    VKVSONST: internalFields.VKVSONST,
  };

  console.log(results);
};
