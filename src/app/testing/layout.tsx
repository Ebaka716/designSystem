'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  LayoutGrid,
  CreditCard,
  PanelLeftOpen,
  PanelLeftClose,
  FlipHorizontal,
  Rows,
  ListTree,
  Activity,
  TrendingUp,
  Newspaper,
  Scale,
  CalendarDays,
  CandlestickChart,
  Building,
} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define components with icons for the sidebar (copied from page.tsx)
// TODO: Consider moving this to a shared constants file later
const components = [
  { id: 'button-section', path: '/testing/button', name: 'Button', icon: LayoutGrid },
  { id: 'card-section', path: '/testing/card', name: 'Card', icon: CreditCard },
  { id: 'detail-row-section', path: '/testing/detail-row', name: 'Detail Row', icon: ListTree },
  { id: 'card-action-footer-section', path: '/testing/card-action-footer', name: 'Card Action Footer', icon: FlipHorizontal },
  { id: 'card-row-layouts-section', path: '/testing/card-row-layouts', name: 'Card Row Layouts', icon: Rows },
  { id: 'market-movers-card', path: '/testing/market-movers', name: 'Market Movers Card', icon: Activity },
  { id: 'markets-card', path: '/testing/markets', name: 'Markets Card', icon: TrendingUp },
  { id: 'market-news-card', path: '/testing/market-news', name: 'Market News Card', icon: Newspaper },
  { id: 'balance-card', path: '/testing/balance', name: 'Balance Card', icon: Scale },
  { id: 'portfolio-events-card', path: '/testing/portfolio-events', name: 'Portfolio Events Card', icon: CalendarDays },
  { id: 'stock-overview-card', path: '/testing/stock-overview', name: 'Stock Overview Card', icon: CandlestickChart },
];

// --- Collapsible Shadcn Sidebar Component ---
// Refactored to use Next.js Link and pathname for navigation
function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="flex flex-col">
        <CustomSidebarTriggerInternal />
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {components.map((component) => (
                <Tooltip key={component.id} delayDuration={0}>
                  <SidebarMenuItem>
                    <TooltipTrigger asChild>
                      <Link href={component.path} passHref>
                        <SidebarMenuButton
                          asChild // Important: Ensures button inherits Link behavior
                          isActive={pathname === component.path}
                        >
                          {/* Wrap content in a span or div if Link needs a single child */}
                          <span> 
                            <component.icon className="size-4" />
                            <span className="group-data-[collapsible=icon]:hidden transition-opacity duration-200">
                              {component.name}
                            </span>
                          </span>
                        </SidebarMenuButton>
                      </Link>
                    </TooltipTrigger>
                  </SidebarMenuItem>
                  <TooltipContent side="right" className="bg-black text-white">
                    {component.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// Custom Sidebar Trigger (copied from page.tsx)
function CustomSidebarTriggerInternal() {
  const { open, setOpen } = useSidebar();
  return (
    <div className={cn("p-2 flex", open ? "justify-end" : "justify-center")}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
        {open ? <PanelLeftClose /> : <PanelLeftOpen />}
        <span className="sr-only">{open ? 'Close Sidebar' : 'Open Sidebar'}</span>
      </Button>
    </div>
  );
}

// Main Layout Component
export default function TestingLayout({ children }: { children: React.ReactNode }) {
  // Removed activeSection state

  return (
    <TooltipProvider>
      <SidebarProvider>
        {/* Sidebar no longer needs state props */}
        <AppSidebar />
        <main className="flex-1 flex flex-col data-[sidebar-open=true]:pl-[var(--sidebar-width)] data-[sidebar-open=false]:pl-[var(--sidebar-width-mobile)] transition-[padding-left] duration-300 ease-in-out">
          <div className="p-4 border-b flex items-center">
            <h1 className="text-xl font-semibold">Component Testing Sandbox</h1>
          </div>
          {/* Render the specific page content here */}
          <div className="p-8 space-y-12 flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
} 