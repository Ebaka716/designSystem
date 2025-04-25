'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { DetailRowV1 } from '@/components/DetailRow/v1';
import { ButtonV2 } from '@/components/Button/v2';
import {
  Info,
  ChevronUp,
  CalendarClock, // Using CalendarClock for Earnings Dates
  Badge,
  ChevronRight,
  DollarSign,
  Building,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Helper: Notification Badge --- 
// TODO: Consider making this a reusable component
const NotificationBadge = ({ count }: { count: number }) => (
  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
    {count}
  </span>
);

// --- Portfolio Events Card Component ---
export const PortfolioEventsCardV1 = () => {
  // TODO: Replace with props for dynamic data
  const eventsData = [
    {
      id: 'earnings',
      icon: CalendarClock,
      title: 'Earnings dates',
      details: 'PYPL, MSFT',
      hasNotification: true,
      notificationCount: 2,
      hasAction: true,
    },
    {
      id: 'ex-dividend',
      icon: DollarSign,
      title: 'Ex-dividend dates',
      details: 'There are no events in the next 14 days',
    },
    {
      id: 'maturing-bonds',
      icon: Building,
      title: 'Maturing bonds or CDs',
      details: 'There are no events in the next 7 days',
    },
    {
      id: '52-week-high',
      icon: ArrowUp,
      title: 'Hit a 52-week high',
      details: 'There are no events in the last 14 days',
    },
    {
      id: '52-week-low',
      icon: ArrowDown,
      title: 'Hit a 52-week low',
      details: 'There are no events in the last 14 days',
    },
  ];

  return (
    <CardV1
      className="shadow-md"
      cardTitle={
        <div className="flex justify-between items-center w-full">
          <span>Portfolio events</span>
          <div className="flex items-center gap-1">
            <ButtonV2 variant="ghost" size="icon" aria-label="Info">
              <Info className="size-4" />
            </ButtonV2>
          </div>
        </div>
      }
      contentProps={{ className: 'p-0' }} // Remove padding from base card content
      cardContent={
        <div>
          {eventsData.map((event, index) => (
            <DetailRowV1
              key={event.id}
              className={cn(
                "px-6 py-4 transition-colors hover:bg-muted/50 cursor-pointer", // Add padding, hover effect, and cursor
                index > 0 && "border-t border-border" // Add border for items after the first
              )}
              primaryContent={
                <div className="flex items-center gap-3"> { /* Container for icon + text */}
                  <div className="relative"> { /* Wrapper for potential badge */}
                    <event.icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
                    {event.hasNotification && <NotificationBadge count={event.notificationCount} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{event.title}</span>
                    <span className="text-sm text-muted-foreground">{event.details}</span>
                  </div>
                </div>
              }
              actionContent={
                event.hasAction ? (
                  <ChevronRight className="size-5 text-muted-foreground" />
                ) : null
              }
            />
          ))}
        </div>
      }
      // No footer for this card
    />
  );
}; 