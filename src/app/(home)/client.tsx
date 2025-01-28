'use client';

import { onSubmitAction } from '@/components/salary-calculator/actions';
import SalaryForm from '@/components/salary-calculator/form';
import ResultsTable from '@/components/salary-calculator/results/table';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

export default function HomeClient() {
  const t = useTranslations('Sidebar');
  const [state, formAction] = useActionState(onSubmitAction, {
    error: false,
    employeeResults: undefined,
    employerResults: undefined,
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="px-6 py-6">
          <SalaryForm
            formState={state}
            formAction={formAction}
          />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 h-4"
          />
          <h1 className="text-sm">{t('title')}</h1>
        </header>
        <div className="flex p-6">
          <ResultsTable results={state} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
