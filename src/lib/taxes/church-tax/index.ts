export const calculateChurchTax = (
  incomeTax: number,
  state: "Bavaria" | "Baden-Württemberg" | "Other",
  isMemberOfChurch: boolean
) => {
  const churchTaxRate =
    state === "Bavaria" || state === "Baden-Württemberg" ? 0.08 : 0.09;

  if (!isMemberOfChurch) {
    return {
      churchTax: 0,
      incomeTax,
    };
  }

  const churchTax = incomeTax * churchTaxRate;

  return churchTax;
};
