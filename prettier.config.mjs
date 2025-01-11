/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleAttributePerLine: true,
  semi: true,
  printWidth: 100,
  trailingComma: 'all',
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  proseWrap: 'always',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
