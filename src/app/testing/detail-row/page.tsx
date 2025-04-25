'use client';

import React from 'react';
import { DetailRowV1 } from "@/components/DetailRow/v1"; 
import { CardV1 } from '@/components/Card/v1';
import { ButtonV2 } from '@/components/Button/v2';
import { cn } from "@/lib/utils"; 
import { CalendarClock, ChevronRight, Bell } from 'lucide-react';

// --- Helper: Notification Badge --- 
// Copied from PortfolioEventsCard/v1.tsx - TODO: Extract to shared location
const NotificationBadge = ({ count }: { count: number }) => (
  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
    {count}
  </span>
);

// TODO: Move this shared data to a common location
const marketNewsData = [
  {
    id: 'news1',
    headline: 'Trump trade war spreads more gloom across businesses worldwide',
    source: 'Reuters', time: '3:15 PM ET', date: 'Apr-24-2025'
  },
  {
    id: 'news2',
    headline: 'Wall Street ends higher on tech boost, easing tariff tensions',
    source: 'Reuters', time: '4:23 PM ET', date: 'Apr-24-2025'
  },
  // Add more news items if needed from the original file
];

export default function DetailRowTestingPage() {
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
    <>
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

      {/* News Item Style (Using primaryContent) */}
      <div>
        <h3 className="text-lg font-medium mb-2">News Item Style</h3>
        <CardV1 className="shadow-none" contentProps={{ className: 'p-0' }}>
          {
            // Use the first item from the sample market news data
            marketNewsData.slice(0, 1).map(news => (
              <DetailRowV1
                key={news.id}
                primaryContent={
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-sm hover:underline">
                      {news.headline}
                    </a>
                    <p className="text-xs text-muted-foreground pt-1">
                      {news.source} · {news.time} {news.date ? `· ${news.date}` : ''}
                    </p>
                  </div>
                }
                className="px-6 py-4" // Add padding
              />
            ))
          }
         {/* Add a second example with a border */}
          {
            marketNewsData.slice(1, 2).map(news => (
              <DetailRowV1
                key={news.id}
                primaryContent={
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-sm hover:underline">
                      {news.headline}
                    </a>
                    <p className="text-xs text-muted-foreground pt-1">
                      {news.source} · {news.time} {news.date ? `· ${news.date}` : ''}
                    </p>
                  </div>
                }
                className="px-6 py-4 border-t" // Add padding and border
              />
            ))
          }
        </CardV1>
      </div>

      {/* --- NEW: Icon, Text Lines, and Action Row --- */}
      <div>
        <h3 className="text-lg font-medium mb-2">Icon, Text Lines, and Action Row</h3>
        <CardV1 className="shadow-none" contentProps={{ className: 'p-0' }}>
          {/* Example 1: With Action & Badge */}
          <DetailRowV1
            className={cn(
              "px-6 py-4 transition-colors hover:bg-muted/50 cursor-pointer" // Add padding, hover effect, and cursor
            )}
            primaryContent={
              <div className="flex items-center gap-3"> { /* Container for icon + text */}
                <div className="relative"> { /* Wrapper for potential badge */}
                  <CalendarClock className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  <NotificationBadge count={3} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Upcoming Event Title</span>
                  <span className="text-sm text-muted-foreground">Relevant details or date</span>
                </div>
              </div>
            }
            actionContent={
              <ChevronRight className="size-5 text-muted-foreground" />
            }
          />
          {/* Example 2: No Action, No Badge */}
          <DetailRowV1
            className={cn(
              "px-6 py-4 transition-colors hover:bg-muted/50 cursor-pointer", // Add padding, hover effect, and cursor
              "border-t border-border" // Add border for items after the first
            )}
            primaryContent={
              <div className="flex items-center gap-3"> { /* Container for icon + text */}
                <div className="relative"> { /* Wrapper for potential badge */}
                  <Bell className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  {/* No Badge */}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Notification Setting</span>
                  <span className="text-sm text-muted-foreground">Manage your preferences</span>
                </div>
              </div>
            }
            actionContent={null} // No Action
          />
        </CardV1>
      </div>

    </>
  );
} 