import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InfoIcon as LucideInfoIcon } from 'lucide-react';
import React from 'react';

export function InfoIcon() {
  return <LucideInfoIcon className="w-4 h-4 stroke-gray-400" />;
}

export function PopoverTooltip({ children }: React.PropsWithChildren) {
  return (
    <Popover>
      <PopoverTrigger>
        <LucideInfoIcon className="w-4 h-4 stroke-gray-400" />
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm">{children}</PopoverContent>
    </Popover>
  );
}
