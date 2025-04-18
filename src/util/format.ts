export const toFixedFloat = (value: number, precision: number) => {
  const regex = new RegExp(`^-?\\d+(?:\\.\\d{0,${precision}})?`);
  const withPrecision = value.toString().match(regex)?.[0];

  if (!withPrecision) {
    throw new Error(`Could not format ${value} with precision ${precision}`);
  }

  return parseFloat(withPrecision);
};

export const roundUpToFullEuro = Math.ceil;
export const roundDownToFullEuro = Math.floor;

export const roundUpToFullCent = (value: number) => Math.ceil(toFixedFloat(value, 3) * 100) / 100;
export const roundDownToFullCent = (value: number) =>
  Math.floor(toFixedFloat(value, 3) * 100) / 100;

export const roundToFullCent = (value: number) => Math.round(toFixedFloat(value, 3) * 100) / 100;
