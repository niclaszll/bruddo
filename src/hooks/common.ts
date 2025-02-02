import { NumberFormatOptions, useFormatter } from 'next-intl';

export const useFormatCurrency = () => {
  const format = useFormatter();

  return (value: number | undefined, formatOrOptions?: NumberFormatOptions) =>
    value !== undefined
      ? format.number(value, {
          ...formatOrOptions,
          style: 'currency',
          currency: 'EUR',
          signDisplay: 'negative',
        })
      : null;
};
