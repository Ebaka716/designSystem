'use client'; // Required for useState 

import * as React from 'react';
import {
  LayoutGrid, // Example icon for Button
  CreditCard, // Example icon for Card
  PanelLeftOpen, // Icon for Sidebar Trigger
  PanelLeftClose,
  Columns, // Icon for Row
  UserSquare, // Icon for AccountDetailRow
  FlipHorizontal, // Icon for CardActionFooter
  Rows, // Icon for Card Row Layouts
  ListTree, // Icon for Detail Row
  ArrowLeft, // Icon for Conversation Card title
  Copy, // Icon for Quick Action
  ThumbsUp, // Icon for Quick Action
  ThumbsDown, // Icon for Quick Action
  Share2, // Icon for Quick Action
} from 'lucide-react'; 

import { ButtonV2 } from '@/components/Button/v2';
import { CardV1 } from '@/components/Card/v1';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button"; // Import Button for SidebarTrigger
import { cn } from "@/lib/utils"; 
import { RowV1 } from "@/components/Row/v1"; // Import the new RowV1
import { DetailRowV1 } from "@/components/DetailRow/v1"; // Correcting the import: DetailRowV1 from correct path
import { CardActionFooterV1 } from "@/components/CardActionFooter/v1"; // Import CardActionFooterV1
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"; // Import Tooltip components

// --- Helper Icons (Keep existing ones) ---
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
);
const SettingsIcon = () => <span>⚙️</span>;
const UserIcon = () => <span>👤</span>;
const InfoIcon = () => <span>ℹ️</span>;
const MoreVerticalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
);

// Placeholder for content blocks
const ContentBlock = ({ label, className }: { label: string, className?: string }) => (
  <div className={cn("flex items-center justify-center p-6 border rounded bg-muted h-full min-h-[100px] text-muted-foreground text-sm", className)}>{label}</div>
);

// Define components with icons for the new sidebar
const components = [
  { id: 'button-section', name: 'Button', icon: LayoutGrid },
  { id: 'card-section', name: 'Card', icon: CreditCard },
  { id: 'detail-row-section', name: 'Detail Row', icon: ListTree }, // Rename Account Detail Row -> Detail Row
  { id: 'card-action-footer-section', name: 'Card Action Footer', icon: FlipHorizontal }, // Add Card Action Footer
  { id: 'card-row-layouts-section', name: 'Card Row Layouts', icon: Rows }, // Add Card Row Layouts
];

// --- Collapsible Shadcn Sidebar Component ---
function AppSidebar({ activeSection, setActiveSection }: { activeSection: string; setActiveSection: (id: string) => void }) {
  return (
    <Sidebar collapsible="icon"> 
      <SidebarContent className="flex flex-col"> 
        {/* Trigger is now self-contained with alignment logic */}
        <CustomSidebarTriggerInternal /> 
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {components.map((component) => (
                <Tooltip key={component.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(component.id)}
                        isActive={activeSection === component.id}
                      >
                        <component.icon className="size-4" />
                        <span className="group-data-[collapsible=icon]:hidden transition-opacity duration-200">
                          {component.name}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-black text-white">
                    {component.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Removed Trigger from bottom */}
      </SidebarContent>
    </Sidebar>
  );
}

// Renamed to avoid conflict with original function scope, adjusted styling
function CustomSidebarTriggerInternal() { 
  const { open, setOpen } = useSidebar();
  return (
    // Added wrapper div with conditional alignment
    <div className={cn(
      "p-2 flex", 
      open ? "justify-end" : "justify-center" // Right-aligned when open, centered when closed
    )}> 
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setOpen(!open)} 
      >
        {open ? <PanelLeftClose /> : <PanelLeftOpen />}
        <span className="sr-only">{open ? 'Close Sidebar' : 'Open Sidebar'}</span>
      </Button>
    </div>
  );
}

// --- Main Page Component ---
export default function TestingPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleV3Click = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const [activeSection, setActiveSection] = React.useState(components[0].id);

  // --- Standard Button Data (using ButtonV2) ---\
  const standardButtonData = {
    primary: {
      variant: 'default' as const,
      sizes: [
        { size: 'sm', label: 'Primary Sm' },
        { size: 'default', label: 'Primary Def' },
        { size: 'lg', label: 'Primary Lg' },
      ] as const,
      icons: [
        { label: 'Icon Lead', icon: <PlaceholderIcon />, iconPosition: 'leading' },
        { label: 'Icon Trail', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
      ] as const,
    },
    secondary: {
      variant: 'outline' as const,
      sizes: [
        { size: 'sm', label: 'Secondary Sm' },
        { size: 'default', label: 'Secondary Def' },
        { size: 'lg', label: 'Secondary Lg' },
      ] as const,
      icons: [
        { label: 'Icon Lead', icon: <PlaceholderIcon />, iconPosition: 'leading' },
        { label: 'Icon Trail', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
      ] as const,
    },
    tertiary: {
      variant: 'ghost' as const,
      sizes: [
        { size: 'sm', label: 'Tertiary Sm' },
        { size: 'default', label: 'Tertiary Def' },
        { size: 'lg', label: 'Tertiary Lg' },
      ] as const,
      icons: [
        { label: 'Icon Lead', icon: <PlaceholderIcon />, iconPosition: 'leading' },
        { label: 'Icon Trail', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
      ] as const,
    },
  };

  // --- Conversational Button Data (using ButtonV2) ---
  const conversationalButtonBaseProps = { variant: 'conversational' as const };
  const conversationalButtonSolidData = [
    { fill: 'solid', size: 'sm', label: 'Solid Small' },
    { fill: 'solid', size: 'default', label: 'Solid Default' },
    { fill: 'solid', size: 'lg', label: 'Solid Large' },
    { fill: 'solid', label: 'Solid Icon', icon: <PlaceholderIcon /> },
    { fill: 'solid', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;
  const conversationalButtonOutlineData = [
    { fill: 'outline', size: 'sm', label: 'Outline Small' },
    { fill: 'outline', size: 'default', label: 'Outline Default' },
    { fill: 'outline', size: 'lg', label: 'Outline Large' },
    { fill: 'outline', label: 'Outline Icon', icon: <PlaceholderIcon /> },
    { fill: 'outline', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;
  const conversationalButtonGhostData = [
    { fill: 'ghost', size: 'sm', label: 'Ghost Small' },
    { fill: 'ghost', size: 'default', label: 'Ghost Default' },
    { fill: 'ghost', size: 'lg', label: 'Ghost Large' },
    { fill: 'ghost', label: 'Ghost Icon', icon: <PlaceholderIcon /> },
    { fill: 'ghost', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;
  const conversationalButtonLoadingData = [
    { fill: 'solid', label: 'Loading Solid', loading: true },
    { fill: 'outline', label: 'Loading Outline', loading: true },
    { fill: 'ghost', label: 'Loading Ghost', loading: true },
  ] as const;

  // --- Card Action Footer Data Array ---
  // SPLIT into Standard and Conversational
  const standardCardActionFooterExamples = [
    {
      id: 'primary-secondary',
      title: 'Save Changes?',
      content: <p className="text-sm text-muted-foreground">You have unsaved changes.</p>,
      primaryAction: <ButtonV2 variant="default" size="default">Save</ButtonV2>,
      secondaryAction: <ButtonV2 variant="outline">Cancel</ButtonV2>,
    },
    {
      id: 'primary-only',
      title: 'Confirm Action',
      content: <p className="text-sm text-muted-foreground">Are you sure you want to proceed?</p>,
      primaryAction: <ButtonV2 variant="default" size="default">Confirm</ButtonV2>,
      secondaryAction: null,
    },
    {
      id: 'secondary-only',
      title: 'Information',
      content: <p className="text-sm text-muted-foreground">This action cannot be undone.</p>,
      primaryAction: null,
      secondaryAction: <ButtonV2 variant="ghost">Dismiss</ButtonV2>,
    },
  ];

  const conversationalCardActionFooterExamples = [
    {
      id: 'convo-ps',
      title: 'Engage?',
      content: <p className="text-sm text-muted-foreground">Start a conversation?</p>,
      primaryAction: <ButtonV2 variant="conversational" fill="solid" size="default">Start Now</ButtonV2>,
      secondaryAction: <ButtonV2 variant="conversational" fill="outline" size="default">Maybe Later</ButtonV2>,
    },
    {
      id: 'convo-p-only',
      title: 'Submit Feedback',
      content: <p className="text-sm text-muted-foreground">Send your thoughts.</p>,
      primaryAction: <ButtonV2 variant="conversational" fill="solid" size="default">Send</ButtonV2>,
      secondaryAction: null,
    },
    {
      id: 'convo-s-only',
      title: 'Reminder Set',
      content: <p className="text-sm text-muted-foreground">We'll notify you later.</p>,
      primaryAction: null,
      secondaryAction: <ButtonV2 variant="conversational" fill="ghost" size="default">Dismiss</ButtonV2>,
    },
  ];

  // --- Simple Card Row Layout Data ---
  const simpleCardLayoutExamples = [
    {
      id: '4-cards',
      title: '4 Cards per Row (flex-wrap)',
      cards: [
        { id: 'c1', cardTitle: 'Card 1', cardContent: 'Content for card 1.', minWidth: '250px' },
        { id: 'c2', cardTitle: 'Card 2', cardContent: 'Content for card 2.', minWidth: '250px' },
        { id: 'c3', cardTitle: 'Card 3', cardContent: 'Content for card 3.', minWidth: '250px' },
        { id: 'c4', cardTitle: 'Card 4', cardContent: 'Content for card 4.', minWidth: '250px' },
      ],
    },
    {
      id: '3-cards',
      title: '3 Cards per Row (flex-wrap)',
      cards: [
        { id: 'cX', cardTitle: 'Card X', cardContent: 'Content for card X.', minWidth: '250px' },
        { id: 'cY', cardTitle: 'Card Y', cardContent: 'Content for card Y.', minWidth: '250px' },
        { id: 'cZ', cardTitle: 'Card Z', cardContent: 'Content for card Z.', minWidth: '250px' },
      ],
    },
    {
      id: '2-cards',
      title: '2 Cards per Row (flex-wrap)',
      cards: [
        { id: 'cA', cardTitle: 'Card A', cardContent: 'Content for card A.', minWidth: '300px' },
        { id: 'cB', cardTitle: 'Card B', cardContent: 'Content for card B.', minWidth: '300px' },
      ],
    },
    {
      id: '1-card',
      title: '1 Card per Row (flex-wrap)',
      cards: [
        { id: 's1', cardTitle: 'Single Card', cardContent: 'This card takes up available space but will wrap if screen is narrow.', minWidth: '200px' },
      ],
    },
  ];

  // --- Reusable Card Components for Row Layouts ---
  const MultipleAccountsCardContent = () => (
    <div className="p-0"> {/* Ensure no padding from parent if contentProps specify it */} 
      <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
      <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
      <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900 - Due Aug 15" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
      <DetailRowV1 primaryText="Investment Portfolio" secondaryText="**** 4321" actionContent={<span className="text-sm font-medium text-blue-600">$115,300.75</span>} className="border-t border-border px-6 py-3"/>
    </div>
  );

  const MultipleAccountsFooter1 = () => (
    <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage Accounts</ButtonV2>} primaryAction={<ButtonV2 variant="default" size="default">Transfer Funds</ButtonV2>}/>
  );

  const MultipleAccountsFooter2 = () => (
    <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage</ButtonV2>} primaryAction={<ButtonV2 variant="default" size="sm">Transfer</ButtonV2>}/>
  );

  // --- Complex Card Layout Data ---\
  const complexCardLayoutExamples = [
    {
      id: '2-complex',
      title: "2 'Multiple Accounts' Cards per Row",
      count: 2,
      minWidth: '400px',
      cardProps: {
        cardTitle: "Multiple Accounts",
        description: "List of linked accounts",
        contentProps: { className: 'p-0' },
        cardContent: <MultipleAccountsCardContent />,
        footer: <MultipleAccountsFooter1 />
      }
    },
    {
      id: '3-complex',
      title: "3 'Multiple Accounts' Cards per Row",
      count: 3,
      minWidth: '300px',
      cardProps: {
        cardTitle: "Multiple Accounts",
        description: "List of linked accounts",
        contentProps: { className: 'p-0' },
        cardContent: <MultipleAccountsCardContent />,
        footer: <MultipleAccountsFooter2 />
      }
    }
  ];

  // --- Detail Row Example Data ---
  const stackedAccountInfoData = [
    {
      id: 'dr-stacked-1',
      primaryText: "Primary Checking",
      secondaryText: "**** **** **** 1234",
      actionContent: <span className="text-base font-semibold text-foreground">$10,543.21</span>,
      needsSeparator: false,
    },
    {
      id: 'dr-stacked-2',
      primaryText: "Savings Account",
      secondaryText: "**** **** **** 5678",
      actionContent: <span className="text-base font-semibold text-foreground">$25,801.50</span>,
      needsSeparator: true,
    },
    {
      id: 'dr-stacked-3',
      primaryText: "Investment Portfolio",
      secondaryText: "**** **** **** 9900",
      actionContent: <span className="text-base font-semibold text-foreground">$115,300.75</span>,
      needsSeparator: true,
    },
  ];

  const textSingleButtonData = [
    {
      id: 'dr-single-btn-1',
      primaryText: "Profile Completion",
      secondaryText: "Your profile is 80% complete.",
      actionContent: <ButtonV2 variant="default" size="sm">Complete Profile</ButtonV2>,
      needsSeparator: false,
    },
    {
      id: 'dr-single-btn-2',
      primaryText: "Notification Settings",
      secondaryText: null, // No secondary text for this one
      actionContent: <ButtonV2 variant="outline">Manage</ButtonV2>,
      needsSeparator: true,
    },
  ];

  const textMultipleButtonData = [ // Only one item in this example
    {
      id: 'dr-multi-btn-1',
      primaryText: "Subscription Status",
      secondaryText: "Active until Dec 31, 2025",
      actionContent: (
        <div className="flex items-center gap-2">
          <ButtonV2 variant="ghost">Details</ButtonV2> 
          <ButtonV2 variant="default" size="sm">Cancel</ButtonV2>
        </div>
      ),
      needsSeparator: false,
    },
  ];

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 flex flex-col data-[sidebar-open=true]:pl-[var(--sidebar-width)] data-[sidebar-open=false]:pl-[var(--sidebar-width-mobile)] transition-[padding-left] duration-300 ease-in-out">
          <div className="p-4 border-b flex items-center">
             {/* Removed CustomSidebarTrigger from here */}
             <h1 className="text-xl font-semibold">Component Testing Sandbox</h1>
          </div>
          <div className="p-8 space-y-12 flex-1 overflow-y-auto">
            {/* --- Button Section --- */}
            {activeSection === 'button-section' && (
              <section id="button-section" className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-2">Standard Buttons (Using ButtonV2)</h2>
                
                {/* Map over categories: Primary, Secondary, Tertiary */}
                {(Object.keys(standardButtonData) as Array<keyof typeof standardButtonData>).map((category) => {
                  const categoryData = standardButtonData[category];
                  return (
                    <div key={category} className="space-y-3 pt-4">
                      <h3 className="text-xl font-medium capitalize">{category}</h3>
                      <div className="p-4 border rounded space-y-4">
                        {/* Size Variations */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Sizes</h4>
                          <div className="flex flex-wrap gap-4 items-center">
                            {categoryData.sizes.map((btn) => (
                              <ButtonV2
                                key={`${category}-size-${btn.size}`}
                                variant={categoryData.variant} 
                                size={btn.size}
                              >
                                {btn.label}
                              </ButtonV2>
                            ))}
                          </div>
                        </div>
                        {/* Icon Variations */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Icons (Default Size)</h4>
                          <div className="flex flex-wrap gap-4 items-center">
                            {categoryData.icons.map((btn, index) => (
                              <ButtonV2 
                                key={`${category}-icon-${index}`}
                                variant={categoryData.variant} 
                                size="default" 
                                icon={btn.icon}
                                iconPosition={btn.iconPosition}
                              >
                                {btn.label}
                              </ButtonV2>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* --- Conversational Buttons (Mapped, using ButtonV2) --- */}
                <section className="space-y-4 pt-6">
                  <h2 className="text-xl font-medium border-b pb-2">Conversational Buttons (Using ButtonV2)</h2>
                  
                  {/* Solid Fill */}
                  <div className="p-4 border rounded flex flex-wrap gap-4 items-center">
                    {conversationalButtonSolidData.map((btn, index) => (
                      <ButtonV2 key={`convo-solid-${index}`} {...conversationalButtonBaseProps} {...btn}>{btn.label}</ButtonV2>
                    ))}
                  </div>
                  
                  {/* Outline Fill */}
                  <div className="p-4 border rounded flex flex-wrap gap-4 items-center">
                    {conversationalButtonOutlineData.map((btn, index) => (
                      <ButtonV2 key={`convo-outline-${index}`} {...conversationalButtonBaseProps} {...btn}>{btn.label}</ButtonV2>
                    ))}
                  </div>
                  
                  {/* Ghost Fill */}
                  <div className="p-4 border rounded flex flex-wrap gap-4 items-center">
                      {conversationalButtonGhostData.map((btn, index) => (
                        <ButtonV2 key={`convo-ghost-${index}`} {...conversationalButtonBaseProps} {...btn}>{btn.label}</ButtonV2>
                      ))}
                  </div>
                  
                  {/* Loading State */}
                  <div className="p-4 border rounded flex flex-wrap gap-4 items-center">
                    {conversationalButtonLoadingData.map((btn, index) => (
                      <ButtonV2 key={`convo-loading-${index}`} {...conversationalButtonBaseProps} {...btn}>{btn.label}</ButtonV2>
                    ))}
                  </div>
                </section>
              </section>
            )}

            {/* --- Card Sections --- */}
            {activeSection === 'card-section' && (
              <section id="card-section" className="space-y-4">
                <h2 className="text-2xl font-semibold">Card Components</h2>
                {/* Card V1 */}
                <section className="space-y-4">
                  <h3 className="text-xl font-medium border-b pb-2">V1: Basic Structure</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded">
                    <CardV1 
                      className="shadow-none"
                      cardTitle="Account Summary" 
                      description="Overview of your main account." 
                      cardContent={<p className="text-3xl font-semibold text-green-700">$5,432.10</p>} 
                      footer={
                        <div className="flex justify-end w-full"> {/* Replaced RowV2 */}
                          <ButtonV2 size="sm" variant="default">Details</ButtonV2>
                        </div>
                      }
                    />
                    <CardV1 cardTitle="Recent Activity" className="shadow-none">
                      <ul className="text-sm space-y-1 text-gray-700"><li>+ $100.00 (Deposit)</li><li>- $25.50 (Coffee Shop)</li><li>- $12.00 (Lunch)</li></ul>
                    </CardV1>
                    <CardV1 cardContent={<p className="text-center text-gray-500">Content Only Card</p>} contentProps={{ className: 'py-8' }} className="shadow-none" />
                  </div>
                </section>

                {/* --- NEW SECTION: Card Examples --- */}
                <section className="space-y-4 pt-6">
                  <h3 className="text-xl font-medium border-b pb-2">V1: Card Examples</h3>
                  <div className="space-y-6 p-4 border rounded">
                    {/* --- MOVED EXAMPLE: CardV1 + 4 DetailRowV1 + CardActionFooterV1 --- */}
                    <CardV1 
                      className="shadow-none"
                      cardTitle="Multiple Accounts" 
                      description="List of linked accounts"
                      contentProps={{ className: 'p-0' }} // Remove padding from default content area
                      cardContent={
                        <div> {/* Wrapper for DetailRows */} 
                          <DetailRowV1 
                            primaryText="Primary Checking" 
                            secondaryText="**** 1234" 
                            actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} 
                            className="px-6 py-3" // Add padding back to rows
                          />
                          <DetailRowV1 
                            primaryText="Savings Account" 
                            secondaryText="**** 5678" 
                            actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} 
                            className="border-t border-border px-6 py-3"
                          />
                          <DetailRowV1 
                            primaryText="Credit Card" 
                            secondaryText="**** 9900 - Due Aug 15" 
                            actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} 
                            className="border-t border-border px-6 py-3"
                          />
                          <DetailRowV1 
                            primaryText="Investment Portfolio" 
                            secondaryText="**** 4321" 
                            actionContent={<span className="text-sm font-medium text-blue-600">$115,300.75</span>} 
                            className="border-t border-border px-6 py-3"
                          />
                        </div>
                      }
                      footer={ // Use CardActionFooterV1
                        <CardActionFooterV1 
                          secondaryAction={<ButtonV2 variant="outline">Manage Accounts</ButtonV2>} 
                          primaryAction={<ButtonV2 variant="default" size="default">Transfer Funds</ButtonV2>}
                        />
                      }
                    />

                    {/* --- NEW EXAMPLE: CardV1 + 3 DetailRowV1 (Multiple Buttons) --- */}
                    <CardV1
                      className="shadow-none"
                      cardTitle="Multiple Actions"
                      description="Rows with multiple button actions"
                      contentProps={{ className: 'p-0' }}
                      cardContent={
                        <div>
                          <DetailRowV1 
                            primaryText="User Preferences"
                            secondaryText="Notification and display settings"
                            actionContent={
                              <div className="flex items-center gap-2">
                                <ButtonV2 variant="ghost">Edit</ButtonV2> 
                                <ButtonV2 variant="default" size="sm">Save</ButtonV2>
                              </div>
                            }
                            className="px-6 py-3"
                          />
                          <DetailRowV1 
                            primaryText="Billing Information"
                            secondaryText="Update payment method"
                            actionContent={
                              <div className="flex items-center gap-2">
                                <ButtonV2 variant="outline">View History</ButtonV2> 
                                <ButtonV2 variant="default" size="sm">Update</ButtonV2>
                              </div>
                            }
                            className="border-t border-border px-6 py-3"
                          />
                          <DetailRowV1 
                            primaryText="Security Settings"
                            secondaryText="Manage password and 2FA"
                            actionContent={
                              <div className="flex items-center gap-2">
                                <ButtonV2 variant="ghost">Activity Log</ButtonV2> 
                                <ButtonV2 variant="default" size="sm">Manage</ButtonV2>
                              </div>
                            }
                            className="border-t border-border px-6 py-3"
                          />
                        </div>
                      }
                      // No footer needed for this example
                    />

                    {/* --- NEW EXAMPLE: Conversation Card (Right Aligned Title) --- */}
                    <CardV1
                      className="shadow-none"
                      cardTitle={
                        <div className="flex flex-col items-end text-right"> {/* Right align container */} 
                          <div className="flex items-center gap-2"> {/* Flex container for icon + text */} 
                             <ArrowLeft className="size-4 text-muted-foreground" /> {/* Added return icon */} 
                            <span className="text-lg font-semibold">User Intent</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Optional clarification subtext</span>
                        </div>
                      }
                      cardContent={
                        <div>
                          <p className="text-sm mb-4">
                            This is the main content area where the primary information or prompt would go.
                          </p>
                          <DetailRowV1 
                            primaryText="Primary Checking" 
                            secondaryText="**** 1234" 
                            actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} 
                            className="border-t border-border pt-3 mt-3" // Add separator and spacing
                          />
                          <DetailRowV1 
                            primaryText="Savings Account" 
                            secondaryText="**** 5678" 
                            actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} 
                            className="border-t border-border pt-3" // Top border only
                          />
                          <DetailRowV1 
                            primaryText="Credit Card" 
                            secondaryText="**** 9900" 
                            actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} 
                            className="border-t border-border pt-3" // Top border only
                          />
                        </div>
                      }
                      footer={
                        <CardActionFooterV1 
                          secondaryAction={<ButtonV2 variant="conversational" fill="outline" size="sm">Decline</ButtonV2>} 
                          primaryAction={<ButtonV2 variant="conversational" fill="solid" size="sm">Accept</ButtonV2>}
                        />
                      }
                    />
                  </div>
                </section>
              </section> 
            )}

            {/* --- Detail Row Section (Partially Refactored) --- */}
            {activeSection === 'detail-row-section' && (
              <section id="detail-row-section" className="space-y-8">
                {/* Updated section id and heading */}
                <h2 className="text-2xl font-semibold">Detail Row Component</h2>

                {/* Stacked Account Info (Mapped) */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Stacked Account Info (Mapped)</h3>
                  <CardV1 className="shadow-none" contentProps={{ className: 'p-0' }}> {/* Remove card padding */} 
                    {stackedAccountInfoData.map((row) => (
                      <DetailRowV1 
                        key={row.id}
                        primaryText={row.primaryText}
                        secondaryText={row.secondaryText}
                        actionContent={row.actionContent}
                        // Add padding back to rows, and conditional top border
                        className={cn("px-6 py-3", row.needsSeparator && "border-t border-border")} 
                      />
                    ))}
                  </CardV1>
                </div>

                {/* Text + Single Button (Mapped) */}
                 <div>
                  <h3 className="text-lg font-medium mb-2">Text + Single Button (Mapped)</h3>
                  <CardV1 className="shadow-none" contentProps={{ className: 'p-0' }}>
                    {textSingleButtonData.map((row) => (
                       <DetailRowV1 
                        key={row.id}
                        primaryText={row.primaryText}
                        secondaryText={row.secondaryText}
                        actionContent={row.actionContent}
                        className={cn("px-6 py-3", row.needsSeparator && "border-t border-border")} 
                      />
                    ))}
                   </CardV1>
                </div>

                {/* Text + Multiple Buttons (Mapped) */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Text + Multiple Buttons (Mapped)</h3>
                  <CardV1 className="shadow-none" contentProps={{ className: 'p-0' }}>
                    {textMultipleButtonData.map((row) => (
                       <DetailRowV1 
                        key={row.id}
                        primaryText={row.primaryText}
                        secondaryText={row.secondaryText}
                        actionContent={row.actionContent}
                        className={cn("px-6 py-3", row.needsSeparator && "border-t border-border")} 
                      />
                    ))}
                  </CardV1>
                </div>

                {/* Activity Log Style (Not refactored - uses primaryContent) */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Activity Log Style</h3>
                  <CardV1 className="shadow-none" contentProps={{ className: 'p-0' }}> {/* Remove card padding */} 
                    {/* Example 1: Using primaryContent */}
                    <DetailRowV1 
                      primaryContent={ // Use primaryContent for the vertical stack
                        <div className="flex flex-col text-sm"> 
                          <span className="text-xs text-muted-foreground">Aug 15, 2024</span>
                          <span className="font-medium">Checking **** 1234</span>
                          <span className="text-muted-foreground">Coffee Shop Purchase</span>
                        </div>
                      }
                      actionContent={ // Dollar Amount
                        <span className="text-sm font-medium text-red-600 whitespace-nowrap"> 
                          - $5.75
                        </span>
                      }
                      // Add padding and alignment directly to the row
                      className="items-center px-6 py-3" 
                    />
                    {/* Example 2: Using primaryContent */}
                    <DetailRowV1 
                      primaryContent={ 
                        <div className="flex flex-col text-sm"> 
                          <span className="text-xs text-muted-foreground">Aug 14, 2024</span>
                          <span className="font-medium">Savings **** 5678</span>
                          <span className="text-muted-foreground">Mobile Deposit</span>
                        </div>
                      }
                      actionContent={ 
                        <span className="text-sm font-medium text-green-700 whitespace-nowrap"> 
                          + $250.00
                        </span>
                      }
                      className="items-center px-6 py-3 border-t border-border"
                    />
                  </CardV1>
                </div>

              </section>
            )}

            {/* --- Card Action Footer Section (Mapped) --- */}
            {activeSection === 'card-action-footer-section' && (
              <section id="card-action-footer-section" className="space-y-8">
                <h2 className="text-2xl font-semibold">Card Action Footer Component</h2>

                {/* Standard Primary/Secondary Examples (Mapped) */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Standard Button Footer Examples</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded"> {/* Adjusted grid */}
                    {standardCardActionFooterExamples.map((example) => (
                      <CardV1
                        key={example.id}
                        cardTitle={example.title}
                        cardContent={example.content}
                        footer={
                          <CardActionFooterV1 
                            primaryAction={example.primaryAction} 
                            secondaryAction={example.secondaryAction} 
                          />
                        }
                        className="shadow-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Conversational Button Examples (Mapped) */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Conversational Button Footer Examples</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded"> {/* Adjusted grid */}
                    {conversationalCardActionFooterExamples.map((example) => (
                      <CardV1
                        key={example.id}
                        cardTitle={example.title}
                        cardContent={example.content}
                        footer={
                          <CardActionFooterV1 
                            primaryAction={example.primaryAction} 
                            secondaryAction={example.secondaryAction} 
                          />
                        }
                        className="shadow-none"
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Actions Footer Example */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Quick Actions Footer Example</h3>
                  <div className="p-4 border rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                    {/* Example 1: Quick Actions Only */}
                    <CardV1
                      className="shadow-none"
                      cardTitle="Generated Content (Quick Actions Only)"
                      cardContent={
                        <p className="text-sm text-muted-foreground">
                          This card demonstrates only the quick actions footer.
                        </p>
                      }
                      footerProps={{ className: 'p-0 flex flex-col' }} 
                      footer={
                        <>
                          {/* No standard/convo footer here */}
                          <hr className="border-border w-full" /> 
                          <div className="flex justify-end items-center gap-1 px-6 pt-2 w-full"> 
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Copy"> <Copy className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Copy</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Thumbs Up"> <ThumbsUp className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Good</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Thumbs Down"> <ThumbsDown className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Bad</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Share"> <Share2 className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Share</TooltipContent> </Tooltip>
                          </div>
                        </>
                      }
                    />

                    {/* Example 2: Standard Footer + Quick Actions */}
                    <CardV1
                      className="shadow-none"
                      cardTitle="Standard Actions + Quick Actions"
                      cardContent={
                        <p className="text-sm text-muted-foreground">
                          This card demonstrates a standard action footer combined with quick actions below it.
                        </p>
                      }
                      footerProps={{ className: 'p-0 flex flex-col' }} // Keep flex-col layout for footer
                      footer={
                        <>
                          {/* Standard Footer Part */}
                          <CardActionFooterV1 
                            primaryAction={<ButtonV2 variant="default" size="default">Save</ButtonV2>}
                            secondaryAction={<ButtonV2 variant="outline">Cancel</ButtonV2>} 
                            className="px-6 py-4" 
                          />
                          {/* Quick Actions Part (Removed mt-auto wrapper div) */}
                          <hr className="border-border w-full" /> 
                          <div className="flex justify-end items-center gap-1 px-6 pt-2 w-full"> 
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Copy"> <Copy className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Copy</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Thumbs Up"> <ThumbsUp className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Good</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Thumbs Down"> <ThumbsDown className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Bad</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Share"> <Share2 className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Share</TooltipContent> </Tooltip>
                          </div>
                        </>
                      }
                    />

                    {/* Example 3: Conversational Footer + Quick Actions */}
                    <CardV1
                      className="shadow-none"
                      cardTitle="Conversational Actions + Quick Actions"
                      cardContent={
                        <p className="text-sm text-muted-foreground">
                          This card demonstrates a conversational action footer combined with quick actions below it.
                        </p>
                      }
                      footerProps={{ className: 'p-0 flex flex-col' }} // Keep flex-col layout for footer
                      footer={
                        <>
                          {/* Conversational Footer Part */}
                          <CardActionFooterV1 
                             primaryAction={<ButtonV2 variant="conversational" fill="solid" size="default">Accept</ButtonV2>}
                             secondaryAction={<ButtonV2 variant="conversational" fill="outline" size="default">Decline</ButtonV2>} 
                             className="px-6 py-4" 
                          />
                          {/* Quick Actions Part (Removed mt-auto wrapper div) */}
                          <hr className="border-border w-full" /> 
                          <div className="flex justify-end items-center gap-1 px-6 pt-2 w-full"> 
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Copy"> <Copy className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Copy</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Thumbs Up"> <ThumbsUp className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Good</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Thumbs Down"> <ThumbsDown className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Bad</TooltipContent> </Tooltip>
                            <Tooltip delayDuration={0}> <TooltipTrigger> <ButtonV2 variant="ghost" size="icon" aria-label="Share"> <Share2 className="size-4" /> </ButtonV2> </TooltipTrigger> <TooltipContent side="bottom" className="bg-black text-white">Share</TooltipContent> </Tooltip>
                          </div>
                        </>
                      }
                    />
                  </div>
                </div>
              </section>
            )}

            {/* --- Card Row Layouts Section (Refactored) --- */}
            {activeSection === 'card-row-layouts-section' && (
              <section id="card-row-layouts-section" className="space-y-8">
                <h2 className="text-2xl font-semibold">Card Row Layouts (Flexbox Examples)</h2>

                {/* Simple Card Examples (Mapped) */}
                {simpleCardLayoutExamples.map((layout) => (
                  <div key={layout.id}>
                    <h3 className="text-lg font-medium mb-2">{layout.title}</h3>
                    <div className="flex flex-wrap gap-6 p-4 border rounded">
                      {layout.cards.map((card) => (
                        <CardV1 
                          key={card.id}
                          cardTitle={card.cardTitle}
                          cardContent={card.cardContent}
                          className={cn("flex-1 shadow-none", `min-w-[${card.minWidth}]`)}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Complex Card Examples (Mapped) */}
                {complexCardLayoutExamples.map((layout, layoutIndex) => (
                  <div key={layout.id} className={layoutIndex > 0 ? "pt-6 border-t" : ""}> {/* Add separator for second complex example */} 
                    <h3 className="text-lg font-medium mb-2">{layout.title}</h3>
                    <div className="flex flex-wrap gap-6 p-4 border rounded">
                      {/* Create an array of specified length to map over */}
                      {Array.from({ length: layout.count }).map((_, cardIndex) => (
                        <CardV1 
                          key={`${layout.id}-card-${cardIndex}`}
                          {...layout.cardProps} // Spread the common props
                          // Append index to title for uniqueness
                          cardTitle={`${layout.cardProps.cardTitle} (${layout.id.startsWith('2') ? 'Card'+(cardIndex+1) : 'Card'+String.fromCharCode(65 + cardIndex)})`}
                          className={cn("flex-1 shadow-none", `min-w-[${layout.minWidth}]`)}
                          // Pass content and footer as components
                          cardContent={layout.cardProps.cardContent} 
                          footer={layout.cardProps.footer}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

          </div> 
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
} 