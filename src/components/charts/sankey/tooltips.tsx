import { useFormatCurrency } from '@/hooks/common';
import { SankeyNodeDatum } from '@nivo/sankey';
import { useFormatter } from 'next-intl';

type LinkTooltipProps = {
  grossSalary: number | undefined;
  link: {
    source: { id: string };
    target: { id: string };
    value: number;
  };
  formatValue?: (value: number) => string;
};

export function LinkTooltip({ grossSalary, link }: LinkTooltipProps) {
  const formatCurrency = useFormatCurrency();
  const format = useFormatter();
  return (
    <div className="rounded-md bg-secondary px-3 py-2 shadow-md text-sm text-foreground">
      <strong>{link.source.id}</strong>
      <span className="text-muted-foreground"> → </span>
      <strong>{link.target.id}</strong>
      <br />
      <span>{formatCurrency(link.value)}</span>{' '}
      <span className="text-muted-foreground">
        {grossSalary && `(${format.number(link.value / grossSalary, { style: 'percent' })})`}
      </span>
    </div>
  );
}

type NodeTooltipProps = {
  grossSalary: number | undefined;
  node: SankeyNodeDatum<
    {
      id: string;
    },
    {
      source: string;
      target: string;
      value: number;
    }
  >;
};

export function NodeTooltip({ grossSalary, node }: NodeTooltipProps) {
  const formatCurrency = useFormatCurrency();
  const format = useFormatter();

  return (
    <div className="rounded-md bg-secondary px-3 py-2 shadow-md text-sm text-foreground">
      <strong>{node.label}</strong>
      <br />
      <span>{formatCurrency(node.value)}</span>{' '}
      <span className="text-muted-foreground">
        {grossSalary && `(${format.number(node.value / grossSalary, { style: 'percent' })})`}
      </span>
    </div>
  );
}
