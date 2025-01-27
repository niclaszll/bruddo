import { useFormatter } from 'next-intl';

export const useFormatCurrency = () => {
  const format = useFormatter();

  return (value: number | undefined) =>
    value !== undefined
      ? format.number(value, { style: 'currency', currency: 'EUR', signDisplay: 'negative' })
      : null;
};
