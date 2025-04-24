import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardActionFooterV1Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary action element (e.g., a Button) */
  primaryAction?: React.ReactNode;
  /** Secondary action element (e.g., an outline or ghost Button) */
  secondaryAction?: React.ReactNode;
}

const CardActionFooterV1 = React.forwardRef<
  HTMLDivElement,
  CardActionFooterV1Props
>(
  (
    {
      className,
      primaryAction,
      secondaryAction,
      ...props
    },
    ref
  ) => {
    // Render only if at least one action is provided
    if (!primaryAction && !secondaryAction) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex justify-end items-center w-full gap-2', // Right-align actions, gap - REMOVED PADDING
          className // Allow overriding via className prop
        )}
        {...props}
      >
        {/* Render secondary action first if it exists */}
        {secondaryAction}
        {/* Render primary action last if it exists */}
        {primaryAction}
      </div>
    );
  }
);
CardActionFooterV1.displayName = 'CardActionFooterV1';

export { CardActionFooterV1 }; 