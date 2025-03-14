'use client';

import { RangeBreakdownAreaChart } from '@/components/charts/area';
import { ContributionBreakdownSankeyChart } from '@/components/charts/sankey';
import { Footer } from '@/components/footer';
import SalaryForm from '@/components/form';
import { FormState, onSubmitAction } from '@/components/form/actions';
import SummaryCards from '@/components/summary-cards';
import ResultTable from '@/components/table';
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
import { initialState } from '@/domain/init';
import { useActionState } from 'react';

function Header() {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-background max-md:px-4 px-6 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 max-md:hidden" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 max-md:hidden"
        />
        <h1 className="max-md:ml-2 text-xl font-black">
          Bru<span className="text-primary">dd</span>o
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

function ResultPanels({ state }: { state: FormState }) {
  return (
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
      <RangeBreakdownAreaChart results={state} />
    </ResizablePanelGroup>
  );
}

export default function HomeClient() {
  const [state, formAction] = useActionState(onSubmitAction, initialState);

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
        <Header />
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
          <ResultPanels state={state} />
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
