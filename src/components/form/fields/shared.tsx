import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { UserInputs } from '@/types/form';
import { cn } from '@/util/tailwind';
import { InfoIcon as LucideInfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ControllerRenderProps, FieldPath, FieldValues, useFormContext } from 'react-hook-form';

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

export function GenericField({
  name,
  className,
  children,
}: {
  name: FieldPath<UserInputs>;
  className?: string;
  children: (field: ControllerRenderProps<FieldValues, keyof UserInputs>) => React.ReactNode;
}) {
  const t = useTranslations(`SalaryCalculator.form.fields.${name}`);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={(field) => (
        <FormItem>
          <FormLabel className="text-md md:text-sm">{t('label')}</FormLabel>
          <div className={cn('flex items-center gap-3', className)}>
            <PopoverTooltip>
              <p className="max-w-sm">{t('tooltip')}</p>
            </PopoverTooltip>
            {children(field.field)}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// pt-3 pb-1
