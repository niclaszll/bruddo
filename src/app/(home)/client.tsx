'use client';

import { onSubmitAction } from '@/components/salary-calculator/actions';
import SalaryForm from '@/components/salary-calculator/form';
import ResultCharts from '@/components/salary-calculator/results/charts';
import ResultTable from '@/components/salary-calculator/results/table';
import { ThemeToggle } from '@/components/theme';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
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
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
            <h1 className="text-sm font-semibold">{t('title')}</h1>
          </div>
          <ThemeToggle />
        </header>
        <ResizablePanelGroup
          direction="horizontal"
          className="flex p-6 gap-6 flex-wrap"
        >
          <ResizablePanel
            defaultSize={50}
            className="min-w-72"
          >
            <ResultTable results={state} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={50}
            className="min-w-72"
          >
            <ResultCharts results={state} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
    </SidebarProvider>
  );
}
