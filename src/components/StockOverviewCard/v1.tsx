'use client';

import React from 'react';
import { ButtonV2 } from '@/components/Button/v2';
import { Slider } from "@/components/ui/slider"; // Import Slider
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  Moon,
  Plus,
  Bell,
  Filter,
  Link,
  Apple // Assuming Apple icon is available or use a placeholder
} from 'lucide-react';

// Placeholder for Apple Logo if specific icon not available
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.978 14.51A6.16 6.16 0 0 0 19.83 11.3a6.318 6.318 0 0 0-1.885-4.41 6.78 6.78 0 0 0-4.9-1.854 6.11 6.11 0 0 0-4.822 2.54A7.1 7.1 0 0 0 5.2 11.88 6.77 6.77 0 0 0 7.9 16.81c1.21.96 2.59 1.41 3.98 1.41.2 0 .4-.01.6-.04a4.17 4.17 0 0 0 3.18-1.86 6.51 6.51 0 0 0 1.55-3.39c.03-.1.06-.2.1-.3m-3.46-8.56a4.03 4.03 0 0 1 2.02 3.46 4.06 4.06 0 0 1-.21 1.27 5.16 5.16 0 0 1-1.51 2.88 4.55 4.55 0 0 1-3.03 1.35 4.47 4.47 0 0 1-3.24-1.44 4.11 4.11 0 0 1-1.06-3.88 4.2 4.2 0 0 1 3.06-3.39 4.39 4.39 0 0 1 3.97-.25M12 4a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-3.5A.75.75 0 0 0 12 4"/></svg>
);

interface KeyDataRowProps {
  icon?: React.ElementType;
  label: string;
  value1: string;
  label2?: string;
  value2: string;
  className?: string;
}

const KeyDataRow: React.FC<KeyDataRowProps> = ({ icon: Icon, label, value1, label2, value2, className }) => (
  <div className="grid grid-cols-3 gap-4 items-center text-sm py-2 border-b border-border last:border-b-0">
    <div className="flex items-center gap-2 text-muted-foreground">
      {Icon && <Icon className="size-4 flex-shrink-0" />}
      <span>{label}</span>
    </div>
    <span className="text-foreground font-medium text-right">{value1}</span>
    <div className="text-right">
      <span className="text-muted-foreground mr-2">{label2}</span>
      <span className="text-foreground font-medium">{value2}</span>
    </div>
  </div>
);

interface RangeSliderProps {
  label: string;
  low: string;
  high: string;
  currentValue: number; // e.g., 50 for midpoint
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ label, low, high, currentValue, className }) => (
  <div className="grid grid-cols-3 gap-4 items-center text-sm py-2 border-b border-border last:border-b-0">
    <span className="text-muted-foreground col-span-1">{label}</span>
    <div className="col-span-2 flex items-center gap-2">
      <span className="text-foreground font-medium">{low}</span>
      <Slider 
        defaultValue={[currentValue]} 
        max={100} 
        step={1} 
        className="flex-1 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-primary [&>span:first-child>span]:rounded-full [&>span:first-child_a]:size-3 [&>span:first-child_a]:bg-primary [&>span:first-child_a]:border-0 [&>span:first-child_a]:shadow-none [&>span:first-child_a]:focus-visible:ring-0 [&>span:first-child_a]:focus-visible:ring-offset-0" 
      />
      <span className="text-foreground font-medium">{high}</span>
    </div>
  </div>
);

// Define Props for the main component
interface StockOverviewCardV1Props {
  showAfterHours?: boolean;
  showActionButtons?: boolean;
  showKeyData?: boolean;
  // Add other props later for data, size etc.
}

export const StockOverviewCardV1: React.FC<StockOverviewCardV1Props> = ({
  showAfterHours = true,
  showActionButtons = true,
  showKeyData = true,
}) => {
  // Define Left Column Content as a variable/fragment
  const LeftColumnContent = (
    <div className="space-y-3 w-full md:w-auto md:flex-shrink-0 min-w-0">
      {/* Header */}
      <div className="flex items-center gap-2">
        <AppleIcon className="size-6" />
        <span className="text-lg font-medium">Apple</span>
      </div>
      {/* Main Quote */}
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">$208.37</span>
        <span className="text-xs text-muted-foreground">XNMS</span>
        <span className="text-lg font-medium text-green-600">+3.77 (+1.84%)</span>
        <ButtonV2 variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <RefreshCw className="size-4" />
        </ButtonV2>
      </div>
      <p className="text-xs text-muted-foreground">As of Apr-24-2025 4:00:00 PM ET</p>
      
      {/* After Hours - Conditional Rendering */}
      {showAfterHours && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm border-t pt-3">
           <Moon className="size-4 text-muted-foreground flex-shrink-0" />
          <span className="font-medium text-muted-foreground flex-shrink-0">After hours</span>
          <span className="font-semibold flex-shrink-0">208.19</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">XNMS</span>
          <span className="text-sm font-medium text-red-600 break-words flex-shrink-0">-0.18 (-0.086385)</span>
          <span className="text-xs text-muted-foreground w-full md:w-auto md:ml-auto break-words text-right md:text-left">As of Apr-24-2025 7:20:25PM ET</span>
        </div>
      )}

      {/* Action Buttons - Conditional Rendering */}
      {showActionButtons && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
           <ButtonV2 variant="default" className="bg-green-600 hover:bg-green-700 text-white">Buy</ButtonV2>
           <ButtonV2 variant="default" className="bg-green-600 hover:bg-green-700 text-white">Sell</ButtonV2>
           <ButtonV2 variant="outline" size="icon" className="text-muted-foreground"><Plus className="size-4" /></ButtonV2>
           <ButtonV2 variant="outline" size="icon" className="text-muted-foreground"><Bell className="size-4" /></ButtonV2>
           <ButtonV2 variant="outline" size="icon" className="text-muted-foreground"><Filter className="size-4" /></ButtonV2>
           <ButtonV2 variant="outline" size="icon" className="text-muted-foreground"><Link className="size-4" /></ButtonV2>
        </div>
      )}
    </div>
  );

  // Define Right Column Content as a variable/fragment
  const RightColumnContent = (
    <div className="flex-1 w-full md:w-auto">
       <KeyDataRow 
        icon={Moon} 
        label="Bid x size (MEMX)" 
        value1="$208.05 x 2" 
        label2="Volume" 
        value2="47,263,007"
       />
       <KeyDataRow 
        icon={Moon}
        label="Ask x size (ARCX)" 
        value1="$208.19 x 1" 
        label2="10/90-day avg. volume" 
        value2="81M / 58M"
       />
       <RangeSlider 
        label="Day range" 
        low="$202.94" 
        high="$208.83" 
        currentValue={80}
       />
        <RangeSlider 
        label="52-week range" 
        low="$166.21" 
        high="$260.10" 
        currentValue={70}
       />
    </div>
  );

  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground">
      {showKeyData ? (
        // Render two-column layout if key data is shown
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-between items-start">
          {LeftColumnContent}
          {RightColumnContent}
        </div>
      ) : (
        // Render only left column content if key data is hidden
        LeftColumnContent
      )}
    </div>
  );
}; 