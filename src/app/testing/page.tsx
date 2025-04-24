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
} from 'lucide-react'; 

import { ButtonV1 } from '@/components/Button/v1';
import { ButtonV2 } from '@/components/Button/v2';
import { ButtonV3 } from '@/components/Button/v3';
import { ButtonV4 } from '@/components/Button/v4'; // Import ButtonV4
// Row imports removed
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
  // { id: 'row-section', name: 'Row (Layout)', icon: Columns }, // Removed Row (Layout)
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

  // --- Button Data Arrays ---
  const buttonV1Data = [
    { variant: 'default', label: 'Primary Action' },
    { variant: 'secondary', label: 'Secondary Action' },
  ] as const;

  const buttonV2Data = [
    { variant: 'outline', label: 'Outline Button' },
    { variant: 'ghost', label: 'Ghost Button' },
    { variant: 'outline', label: 'Leading Icon', icon: <PlaceholderIcon />, iconPosition: 'leading' },
    { variant: 'ghost', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;

  const buttonV3SizeData = [
    { size: 'sm', label: 'Small' },
    { size: 'default', label: 'Default' },
    { size: 'lg', label: 'Large' },
  ] as const;

  const buttonV3LoadingData = [
    { size: 'default' as const, label: isLoading ? 'Processing...' : 'Click to Load', loading: isLoading, onClick: handleV3Click },
    { size: 'default' as const, label: 'Always Loading', loading: true },
  ];

  const buttonV4BaseProps = { variant: 'conversational' as const };
  const buttonV4SolidData = [
    { fill: 'solid', size: 'sm', label: 'Solid Small' },
    { fill: 'solid', size: 'default', label: 'Solid Default' },
    { fill: 'solid', size: 'lg', label: 'Solid Large' },
    { fill: 'solid', label: 'Solid Icon', icon: <PlaceholderIcon /> },
    { fill: 'solid', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;
  const buttonV4OutlineData = [
    { fill: 'outline', size: 'sm', label: 'Outline Small' },
    { fill: 'outline', size: 'default', label: 'Outline Default' },
    { fill: 'outline', size: 'lg', label: 'Outline Large' },
    { fill: 'outline', label: 'Outline Icon', icon: <PlaceholderIcon /> },
    { fill: 'outline', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;
  const buttonV4GhostData = [
    { fill: 'ghost', size: 'sm', label: 'Ghost Small' },
    { fill: 'ghost', size: 'default', label: 'Ghost Default' },
    { fill: 'ghost', size: 'lg', label: 'Ghost Large' },
    { fill: 'ghost', label: 'Ghost Icon', icon: <PlaceholderIcon /> },
    { fill: 'ghost', label: 'Trailing Icon', icon: <PlaceholderIcon />, iconPosition: 'trailing' },
  ] as const;
  const buttonV4LoadingData = [
    { fill: 'solid', label: 'Loading Solid', loading: true },
    { fill: 'outline', label: 'Loading Outline', loading: true },
    { fill: 'ghost', label: 'Loading Ghost', loading: true },
  ] as const;

  // --- Card Action Footer Data Array ---
  const cardActionFooterExamples = [
    {
      id: 'primary-only',
      title: 'Confirm Action',
      content: <p className="text-sm text-muted-foreground">Are you sure you want to proceed?</p>,
      primaryAction: <ButtonV3 size="default">Confirm</ButtonV3>,
      secondaryAction: null,
    },
    {
      id: 'primary-secondary',
      title: 'Save Changes?',
      content: <p className="text-sm text-muted-foreground">You have unsaved changes.</p>,
      primaryAction: <ButtonV3 size="default">Save</ButtonV3>,
      secondaryAction: <ButtonV2 variant="outline">Cancel</ButtonV2>,
    },
    {
      id: 'secondary-only',
      title: 'Information',
      content: <p className="text-sm text-muted-foreground">This action cannot be undone.</p>,
      primaryAction: null,
      secondaryAction: <ButtonV2 variant="ghost">Dismiss</ButtonV2>,
    },
    {
      id: 'convo-ps',
      title: 'Engage?',
      content: <p className="text-sm text-muted-foreground">Start a conversation?</p>,
      primaryAction: <ButtonV4 variant="conversational" fill="solid" size="default">Start Now</ButtonV4>,
      secondaryAction: <ButtonV4 variant="conversational" fill="outline" size="default">Maybe Later</ButtonV4>,
    },
    {
      id: 'convo-p-only',
      title: 'Submit Feedback',
      content: <p className="text-sm text-muted-foreground">Send your thoughts.</p>,
      primaryAction: <ButtonV4 variant="conversational" fill="solid" size="default">Send</ButtonV4>,
      secondaryAction: null,
    },
    {
      id: 'convo-s-only',
      title: 'Reminder Set',
      content: <p className="text-sm text-muted-foreground">We'll notify you later.</p>,
      primaryAction: null,
      secondaryAction: <ButtonV4 variant="conversational" fill="ghost" size="default">Dismiss</ButtonV4>,
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
            {/* --- Button Sections --- */}
            {activeSection === 'button-section' && (
              <section id="button-section" className="space-y-4">
                <h2 className="text-2xl font-semibold border-b pb-2">Button Components</h2>
                
                {/* V1: Mapped */}
                <h3 className="text-xl font-medium">V1: Solid Primary/Secondary</h3>
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                  {buttonV1Data.map((btn, index) => (
                    <ButtonV1 key={`v1-${index}`} {...btn}>{btn.label}</ButtonV1>
                  ))}
                </div>

                {/* V2: Mapped */}
                <h3 className="text-xl font-medium pt-4">V2: Outline/Ghost + Icon</h3>
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                  {buttonV2Data.map((btn, index) => (
                    <ButtonV2 key={`v2-${index}`} {...btn}>{btn.label}</ButtonV2>
                  ))}
                </div>

                {/* V3: Mapped */}
                <h3 className="text-xl font-medium pt-4">V3: Sizes + Loading</h3>
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                  {buttonV3SizeData.map((btn, index) => (
                    <ButtonV3 key={`v3-size-${index}`} {...btn}>{btn.label}</ButtonV3>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                   {buttonV3LoadingData.map((btn, index) => (
                    <ButtonV3 key={`v3-loading-${index}`} {...btn}>{btn.label}</ButtonV3>
                  ))}
                </div>
              </section> 
            )}

            {/* --- V4: Conversational Buttons (Mapped) --- */}
            {activeSection === 'button-section' && (
              <section className="space-y-4 pt-6">
                <h3 className="text-xl font-medium border-b pb-2">V4: Conversational</h3>
                
                {/* Solid Fill */}
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                  {buttonV4SolidData.map((btn, index) => (
                    <ButtonV4 key={`v4-solid-${index}`} {...buttonV4BaseProps} {...btn}>{btn.label}</ButtonV4>
                  ))}
                </div>
                
                {/* Outline Fill */}
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                  {buttonV4OutlineData.map((btn, index) => (
                    <ButtonV4 key={`v4-outline-${index}`} {...buttonV4BaseProps} {...btn}>{btn.label}</ButtonV4>
                  ))}
                </div>
                
                {/* Ghost Fill */}
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                   {buttonV4GhostData.map((btn, index) => (
                    <ButtonV4 key={`v4-ghost-${index}`} {...buttonV4BaseProps} {...btn}>{btn.label}</ButtonV4>
                  ))}
                </div>
                
                {/* Loading State */}
                <div className="flex flex-wrap gap-4 items-center p-4 border rounded">
                  {buttonV4LoadingData.map((btn, index) => (
                    <ButtonV4 key={`v4-loading-${index}`} {...buttonV4BaseProps} {...btn}>{btn.label}</ButtonV4>
                  ))}
                </div>
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
                      title="Account Summary" 
                      description="Overview of your main account." 
                      content={<p className="text-3xl font-semibold text-green-700">$5,432.10</p>} 
                      footer={
                        <div className="flex justify-end w-full"> {/* Replaced RowV2 */}
                          <ButtonV3 size="sm" variant="default">Details</ButtonV3>
                        </div>
                      }
                    />
                    <CardV1 title="Recent Activity" className="shadow-none">
                      <ul className="text-sm space-y-1 text-gray-700"><li>+ $100.00 (Deposit)</li><li>- $25.50 (Coffee Shop)</li><li>- $12.00 (Lunch)</li></ul>
                    </CardV1>
                    <CardV1 content={<p className="text-center text-gray-500">Content Only Card</p>} contentProps={{ className: 'py-8' }} className="shadow-none" />
                  </div>
                </section>

                {/* --- NEW SECTION: Card Examples --- */}
                <section className="space-y-4 pt-6">
                  <h3 className="text-xl font-medium border-b pb-2">V1: Card Examples</h3>
                  <div className="space-y-6 p-4 border rounded">
                    {/* --- MOVED EXAMPLE: CardV1 + 4 DetailRowV1 + CardActionFooterV1 --- */}
                    <CardV1 
                      className="shadow-none"
                      title="Multiple Accounts" 
                      description="List of linked accounts"
                      contentProps={{ className: 'p-0' }} // Remove padding from default content area
                      content={
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
                          primaryAction={<ButtonV3 size="default">Transfer Funds</ButtonV3>}
                        />
                      }
                    />

                    {/* --- NEW EXAMPLE: CardV1 + 3 DetailRowV1 (Multiple Buttons) --- */}
                    <CardV1
                      className="shadow-none"
                      title="Multiple Actions"
                      description="Rows with multiple button actions"
                      contentProps={{ className: 'p-0' }}
                      content={
                        <div>
                          <DetailRowV1 
                            primaryText="User Preferences"
                            secondaryText="Notification and display settings"
                            actionContent={
                              <div className="flex items-center gap-2">
                                <ButtonV2 variant="ghost">Edit</ButtonV2> 
                                <ButtonV3 size="sm">Save</ButtonV3>
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
                                <ButtonV3 size="sm">Update</ButtonV3>
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
                                <ButtonV3 size="sm">Manage</ButtonV3>
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
                      title={
                        <div className="flex flex-col items-end text-right"> {/* Right align container */} 
                          <div className="flex items-center gap-2"> {/* Flex container for icon + text */} 
                             <ArrowLeft className="size-4 text-muted-foreground" /> {/* Added return icon */} 
                            <span className="text-lg font-semibold">User Intent</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Optional clarification subtext</span>
                        </div>
                      }
                      content={
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
                          secondaryAction={<ButtonV4 variant="conversational" fill="outline" size="sm">Decline</ButtonV4>} 
                          primaryAction={<ButtonV4 variant="conversational" fill="solid" size="sm">Accept</ButtonV4>}
                        />
                      }
                    />
                  </div>
                </section>
              </section> 
            )}

            {/* --- Detail Row Section --- */}
            {activeSection === 'detail-row-section' && (
              <section id="detail-row-section" className="space-y-8">
                {/* Updated section id and heading */}
                <h2 className="text-2xl font-semibold">Detail Row Component</h2>

                {/* Adapted Old Examples */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Stacked Account Info (Adapted)</h3>
                  <CardV1 className="shadow-none">
                    {/* Use DetailRowV1 and new props */}
                    <DetailRowV1 
                      primaryText="Primary Checking" 
                      secondaryText="**** **** **** 1234" 
                      actionContent={<span className="text-base font-semibold text-foreground">$10,543.21</span>} 
                    />
                    <DetailRowV1 
                      primaryText="Savings Account" 
                      secondaryText="**** **** **** 5678" 
                      actionContent={<span className="text-base font-semibold text-foreground">$25,801.50</span>} 
                      className="border-t border-border" // Add separator
                    />
                    <DetailRowV1 
                      primaryText="Investment Portfolio" 
                      secondaryText="**** **** **** 9900" 
                      actionContent={<span className="text-base font-semibold text-foreground">$115,300.75</span>} 
                      className="border-t border-border" // Add separator
                    />
                  </CardV1>
                </div>

                {/* New Examples: Left Text + Right Button(s) */}
                 <div>
                  <h3 className="text-lg font-medium mb-2">Text + Single Button</h3>
                  <CardV1 className="shadow-none">
                    <DetailRowV1 
                      primaryText="Profile Completion"
                      secondaryText="Your profile is 80% complete."
                      actionContent={<ButtonV3 size="sm">Complete Profile</ButtonV3>} 
                    />
                    <DetailRowV1 
                      primaryText="Notification Settings"
                      actionContent={<ButtonV2 variant="outline">Manage</ButtonV2>}
                       className="border-t border-border" 
                    />
                   </CardV1>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Text + Multiple Buttons</h3>
                  <CardV1 className="shadow-none">
                    <DetailRowV1 
                      primaryText="Subscription Status"
                      secondaryText="Active until Dec 31, 2025"
                      actionContent={
                        <div className="flex items-center gap-2">
                          <ButtonV2 variant="ghost">Details</ButtonV2> 
                          <ButtonV3 size="sm">Cancel</ButtonV3>
                        </div>
                      }
                    />
                   </CardV1>
                </div>

                {/* Removed old sm/lg examples as component isn't sized */}

              </section>
            )}

            {/* --- Card Action Footer Section (Mapped) --- */}
            {activeSection === 'card-action-footer-section' && (
              <section id="card-action-footer-section" className="space-y-8">
                <h2 className="text-2xl font-semibold">Card Action Footer Component (in CardV1)</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cardActionFooterExamples.map((example) => (
                    <div key={example.id}>
                      {/* Use a more descriptive title based on the example ID if needed, or use the title from data */} 
                      <h3 className="text-lg font-medium mb-2 capitalize">{example.id.replace(/-/g, ' ')}</h3> 
                      <CardV1 
                        className="shadow-none"
                        title={example.title} 
                        content={example.content}
                        footer={
                          <CardActionFooterV1 
                            primaryAction={example.primaryAction} 
                            secondaryAction={example.secondaryAction}
                          />
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* Note: The original layout had the first 3 examples in one grid and the next 3 
                     in another with a border-top. This refactor puts them all in one grid. 
                     Adjust layout if specific grouping is critical. */}

              </section>
            )}

            {/* --- Card Row Layouts Section --- */}
            {activeSection === 'card-row-layouts-section' && (
              <section id="card-row-layouts-section" className="space-y-8">
                <h2 className="text-2xl font-semibold">Card Row Layouts (Flexbox Examples)</h2>

                {/* Example 1: 4 Cards */}
                <div>
                  <h3 className="text-lg font-medium mb-2">4 Cards per Row (flex-wrap)</h3>
                  <div className="flex flex-wrap gap-6 p-4 border rounded">
                    <CardV1 title="Card 1" content="Content for card 1." className="flex-1 min-w-[250px] shadow-none"/>
                    <CardV1 title="Card 2" content="Content for card 2." className="flex-1 min-w-[250px] shadow-none"/>
                    <CardV1 title="Card 3" content="Content for card 3." className="flex-1 min-w-[250px] shadow-none"/>
                     <CardV1 title="Card 4" content="Content for card 4." className="flex-1 min-w-[250px] shadow-none"/>
                  </div>
                </div>

                {/* Example 1.5: 3 Cards */}
                 <div>
                  <h3 className="text-lg font-medium mb-2">3 Cards per Row (flex-wrap)</h3>
                  <div className="flex flex-wrap gap-6 p-4 border rounded">
                    <CardV1 title="Card X" content="Content for card X." className="flex-1 min-w-[250px] shadow-none"/>
                    <CardV1 title="Card Y" content="Content for card Y." className="flex-1 min-w-[250px] shadow-none"/>
                    <CardV1 title="Card Z" content="Content for card Z." className="flex-1 min-w-[250px] shadow-none"/>
                  </div>
                </div>

                {/* Example 2: 2 Cards */}
                 <div>
                  <h3 className="text-lg font-medium mb-2">2 Cards per Row (flex-wrap)</h3>
                  <div className="flex flex-wrap gap-6 p-4 border rounded">
                    <CardV1 title="Card A" content="Content for card A." className="flex-1 min-w-[300px] shadow-none"/>
                    <CardV1 title="Card B" content="Content for card B." className="flex-1 min-w-[300px] shadow-none"/>
                  </div>
                </div>

                {/* Example 3: 1 Card */}
                <div>
                  <h3 className="text-lg font-medium mb-2">1 Card per Row (flex-wrap)</h3>
                   <div className="flex flex-wrap gap-6 p-4 border rounded">
                    <CardV1 title="Single Card" content="This card takes up available space but will wrap if screen is narrow." className="flex-1 min-w-[200px] shadow-none"/>
                  </div>
                </div>

                {/* --- Complex Card Examples in Rows --- */}
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">2 'Multiple Accounts' Cards per Row</h3>
                  <div className="flex flex-wrap gap-6 p-4 border rounded">
                    {/* Card Instance 1 */} 
                    {/* NOTE: Using V1/V2 buttons in footer as per previous state */} 
                    <CardV1 
                      title="Multiple Accounts (Card 1)" 
                      description="List of linked accounts"
                      className="flex-1 min-w-[400px] shadow-none" 
                      contentProps={{ className: 'p-0' }} 
                      content={
                        <div> 
                          <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
                          <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900 - Due Aug 15" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Investment Portfolio" secondaryText="**** 4321" actionContent={<span className="text-sm font-medium text-blue-600">$115,300.75</span>} className="border-t border-border px-6 py-3"/>
                        </div>
                      }
                      footer={ 
                        <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage Accounts</ButtonV2>} primaryAction={<ButtonV3 size="default">Transfer Funds</ButtonV3>}/>
                      }
                    />
                    {/* Card Instance 2 */}
                     <CardV1 
                      title="Multiple Accounts (Card 2)" 
                      description="List of linked accounts"
                      className="flex-1 min-w-[400px] shadow-none" 
                      contentProps={{ className: 'p-0' }} 
                      content={
                        <div> 
                          <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
                          <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900 - Due Aug 15" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Investment Portfolio" secondaryText="**** 4321" actionContent={<span className="text-sm font-medium text-blue-600">$115,300.75</span>} className="border-t border-border px-6 py-3"/>
                        </div>
                      }
                      footer={ 
                        <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage Accounts</ButtonV2>} primaryAction={<ButtonV3 size="default">Transfer Funds</ButtonV3>}/>
                      }
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-2">3 'Multiple Accounts' Cards per Row</h3>
                  <div className="flex flex-wrap gap-6 p-4 border rounded">
                     {/* Card Instance 1 */} 
                     <CardV1 
                      title="Multiple Accounts (Card A)" 
                      description="List of linked accounts"
                      className="flex-1 min-w-[300px] shadow-none" 
                      contentProps={{ className: 'p-0' }} 
                      content={
                        <div> 
                          <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
                          <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
                        </div>
                      }
                      footer={ 
                        <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage</ButtonV2>} primaryAction={<ButtonV3 size="sm">Transfer</ButtonV3>}/>
                      }
                    />
                     {/* Card Instance 2 */}
                     <CardV1 
                      title="Multiple Accounts (Card B)" 
                      description="List of linked accounts"
                      className="flex-1 min-w-[300px] shadow-none" 
                      contentProps={{ className: 'p-0' }} 
                      content={
                        <div> 
                          <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
                          <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
                        </div>
                      }
                      footer={ 
                        <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage</ButtonV2>} primaryAction={<ButtonV3 size="sm">Transfer</ButtonV3>}/>
                      }
                    />
                     {/* Card Instance 3 */}
                     <CardV1 
                      title="Multiple Accounts (Card C)" 
                      description="List of linked accounts"
                      className="flex-1 min-w-[300px] shadow-none" 
                      contentProps={{ className: 'p-0' }} 
                      content={
                        <div> 
                          <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
                          <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
                          <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
                        </div>
                      }
                      footer={ 
                        <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage</ButtonV2>} primaryAction={<ButtonV3 size="sm">Transfer</ButtonV3>}/>
                      }
                    />
                  </div>
                </div>

              </section>
            )}

          </div> 
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
} 