'use client';

import { onSubmitAction } from '@/components/salary-calculator/actions';
import SalaryForm from '@/components/salary-calculator/form';
import { ContributionBreakdownSankeyChart } from '@/components/salary-calculator/results/charts/sankey';
import SummaryCards from '@/components/salary-calculator/results/summary-cards';
import ResultTable from '@/components/salary-calculator/results/table';
import { ThemeToggle } from '@/components/theme';
import { Card } from '@/components/ui/card';
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
import { Calculator } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

export default function HomeClient() {
  const t = useTranslations('Sidebar');
  const [state, formAction] = useActionState(onSubmitAction, {
    error: false,
    employeeResults: undefined,
    employerResults: undefined,
    employeeResultsRange: undefined,
    userInputs: undefined,
  });

  return (
    <SidebarProvider>
      <Sidebar className="max-md:hidden">
        <SidebarContent className="p-6 max-md:hidden">
          <SalaryForm
            formState={state}
            formAction={formAction}
          />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background max-md:px-4 px-6 z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 max-md:hidden" />
            <Calculator className="h-6 md:hidden mr-2" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
            <h1 className="text-sm font-semibold">{t('title')}</h1>
          </div>
          <ThemeToggle />
        </header>
        <div className="flex p-4 gap-4 lg:p-6 lg:gap-6 flex-col">
          <Card className="p-6 md:hidden">
            <SalaryForm
              formState={state}
              formAction={formAction}
            />
          </Card>
          <div className="max-md:hidden">
            <SummaryCards results={state} />
          </div>
          <ResizablePanelGroup
            direction="horizontal"
            className="flex gap-4 lg:gap-6 flex-wrap xl:flex-col"
          >
            <ResizablePanel
              defaultSize={50}
              className="min-w-full xl:min-w-108"
            >
              <ResultTable results={state} />
              <div className="md:hidden pt-4">
                <SummaryCards results={state} />
              </div>
            </ResizablePanel>
            <ResizableHandle className="max-xl:hidden" />
            <ResizablePanel
              defaultSize={50}
              className="min-w-full xl:min-w-108 flex justify-stretch"
            >
              <ContributionBreakdownSankeyChart results={state} />
            </ResizablePanel>
          </ResizablePanelGroup>
          {/* <RangeBreakdownAreaChart results={state} /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
