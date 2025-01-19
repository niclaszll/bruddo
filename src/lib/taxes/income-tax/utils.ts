import { IncomeTaxTariffType } from '@/types/income-tax';

export const getIncomeTaxTariffTypeFactor = (type: IncomeTaxTariffType) => {
  return type === IncomeTaxTariffType.enum.BASIC ? 1 : 2;
};
