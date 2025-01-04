export const toFixedFloat = (value: number, precision: number) => {
  const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${precision}})?`);
  const withPrecision = value.toString().match(regex)?.[0];

  if (!withPrecision) {
    throw new Error(`Could not format ${value} with precision ${precision}`);
  }

  return parseFloat(withPrecision);
};

export const roundUpToFullEuro = (value: number) => Math.ceil(value);
export const roundDownToFullEuro = (value: number) => Math.floor(value);

export const roundUpToFullCent = (value: number) =>
  Math.ceil(toFixedFloat(value, 3) * 100) / 100;
export const roundDownToFullCent = (value: number) =>
  Math.floor(toFixedFloat(value, 3) * 100) / 100;
