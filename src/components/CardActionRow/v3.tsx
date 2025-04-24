import * as React from 'react';
import { cn } from '@/lib/utils';

// Assuming GapValue and AlignItems types are available or defined here
// We won't use RowV3 directly, managing responsive classes here is simpler
type GapValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

// --- Mappings to Tailwind classes (subset needed) ---
const gapClasses: Record<GapValue, string> = {
  0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 5: 'gap-5',
  6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12', 16: 'gap-16',
  20: 'gap-20', 24: 'gap-24'
};

const alignItemsClasses: Record<AlignItems, string> = {
  start: 'items-start', center: 'items-center', end: 'items-end',
  stretch: 'items-stretch', baseline: 'items-baseline'
};

export interface CardActionRowV3Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'align'> {
  primaryText?: React.ReactNode;
  secondaryText?: React.ReactNode;
  action?: React.ReactNode;
  align?: AlignItems;
  gap?: GapValue;
  /** The breakpoint *below which* the layout stacks vertically. */
  stackBelow?: Breakpoint;
}

const CardActionRowV3 = React.forwardRef<
  HTMLDivElement,
  CardActionRowV3Props
>(
  (
    {
      className,
      primaryText,
      secondaryText,
      action,
      align = 'center',
      gap = 4,
      stackBelow, // New prop for responsive stacking
      children,
      ...props
    },
    ref
  ) => {
    const hasLeftContent = primaryText || secondaryText;

    // Base classes for horizontal layout
    const baseClasses = [
      'flex',
      'flex-row',
      'justify-between',
      alignItemsClasses[align],
      gapClasses[gap],
    ];

    // Responsive classes for stacking
    const stackClasses: string[] = [];
    if (stackBelow) {
      // Apply stacking classes up to the specified breakpoint
      // Example: stackBelow='md' -> applies col layout on base and sm screens
      const prefix = stackBelow; // sm, md, lg, xl
      stackClasses.push(
        'flex-col', // Default to column
        'items-start', // Usually align left when stacked
        'gap-2', // Often a smaller gap when stacked
        // Revert to row layout *at* the breakpoint and above
        `${prefix}:flex-row`,
        `${prefix}:${alignItemsClasses[align]}`,
        `${prefix}:justify-between`,
        `${prefix}:${gapClasses[gap]}`
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          stackBelow ? stackClasses : baseClasses, // Apply base or stacking logic
          className
        )}
        {...props}
      >
        {/* Left Content Stack */}
        {hasLeftContent && (
          <div className={cn(
            // Don't force flex-1 when stacked, allow natural width
            stackBelow ? "w-full" : "flex-1", 
            "flex flex-col"
          )}>
            {primaryText && (
              <div className="text-sm font-medium text-foreground">
                {primaryText}
              </div>
            )}
            {secondaryText && (
              <div className={cn(
                "text-sm text-muted-foreground",
                primaryText && "mt-0.5"
              )}>
                {secondaryText}
              </div>
            )}
          </div>
        )}

        {!hasLeftContent && !action && children && (
             <div className={cn(stackBelow ? "w-full" : "flex-1")}>{children}</div>
        )}

        {/* Right Action Area */}
        {action && (
          <div className={cn(
            // Add top margin when stacked, except when there's no left content
            stackBelow && hasLeftContent && "mt-2", 
            stackBelow && `${stackBelow}:mt-0` // Remove margin above breakpoint
          )}>
            {action}
          </div>
        )}
      </div>
    );
  }
);
CardActionRowV3.displayName = 'CardActionRowV3';

export { CardActionRowV3 }; 