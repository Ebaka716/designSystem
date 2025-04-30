'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CardV1 } from '@/components/Card/v1';
import { ButtonV2 } from '@/components/Button/v2';

export interface StackedButtonCardProps extends Omit<React.ComponentProps<typeof CardV1>, 'cardContent' | 'children'> {
  cardTitle: React.ReactNode; // Make title mandatory for this component
  buttons: { id: string; label: React.ReactNode; onClick?: () => void }[];
}

const StackedButtonCardV1 = React.forwardRef<HTMLDivElement, StackedButtonCardProps>(
  ({ className, cardTitle, buttons = [], ...props }, ref) => {
    // Ensure we only use up to 5 buttons if more are passed
    const displayButtons = buttons.slice(0, 5);

    return (
      <CardV1
        ref={ref}
        className={cn("", className)} // Add any specific styling if needed
        cardTitle={cardTitle}
        contentProps={{ className: 'p-4' }} // Add some padding around buttons
        {...props}
      >
        <div className="flex flex-col space-y-2">
          {displayButtons.map((button) => (
            <ButtonV2
              key={button.id}
              variant="conversational" // Change variant
              fill="solid" // Add fill prop
              size="sm" // Small size
              onClick={button.onClick}
              className="w-full justify-start" // Align text to start like a list item
            >
              {button.label}
            </ButtonV2>
          ))}
          {/* Render placeholders if fewer than 5 buttons provided */}
          {Array.from({ length: Math.max(0, 5 - displayButtons.length) }).map((_, index) => (
             <ButtonV2
              key={`placeholder-${index}`}
              variant="conversational" // Change variant
              fill="solid" // Add fill prop
              size="sm"
              disabled
              className="w-full justify-start opacity-50" // Make placeholders less prominent
            >
              Placeholder Action {displayButtons.length + index + 1}
            </ButtonV2>
          ))}
        </div>
      </CardV1>
    );
  }
);
StackedButtonCardV1.displayName = 'StackedButtonCardV1';

export { StackedButtonCardV1 }; 