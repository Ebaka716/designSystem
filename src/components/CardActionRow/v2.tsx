import * as React from 'react';
import { cn } from '@/lib/utils';
// import { RowV2, type RowV2Props } from '@/components/Row/v2'; // Removed

// Removed RowV2 specific types
// type AlignItems = RowV2Props['align'];
// type GapValue = RowV2Props['gap'];

// Define alignment and gap types directly or use Tailwind types if available
// For simplicity, using common string values here
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type GapValue = number | string; // Can be number for spacing unit or string like 'px', 'rem' etc.

export interface CardActionRowV2Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'align'> {
  /** Primary text content (e.g., title, label) - aligned left */
  primaryText?: React.ReactNode;
  /** Secondary text content (e.g., subtitle, description) - aligned left, below primary */
  secondaryText?: React.ReactNode;
  /** Action content (e.g., Button, Icon) - aligned right */
  action?: React.ReactNode;

  /** Vertical alignment of the left stack and right action. Use Tailwind classes like 'items-start', 'items-center', etc. */
  align?: AlignItems;
  /** Horizontal gap between the left stack and right action. Use Tailwind gap classes like 'gap-4'. */
  gap?: GapValue;

  // Removed rowProps
  // /** Direct props for the underlying RowV2, allowing override of align/gap/justify etc. */
  // rowProps?: Omit<React.ComponentProps<typeof RowV2>, 'children'>;
}

// Map align prop to Tailwind item alignment classes
const alignMap: { [key in AlignItems]: string } = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const CardActionRowV2 = React.forwardRef<
  HTMLDivElement,
  CardActionRowV2Props
>(
  (
    {
      className,
      primaryText,
      secondaryText,
      action,
      align = 'center', 
      gap = 4, 
      // rowProps, // Removed
      children,
      ...props
    },
    ref
  ) => {
    const hasLeftContent = primaryText || secondaryText;

    // Construct Tailwind classes dynamically
    const alignmentClass = alignMap[align] || alignMap.center;
    // Assuming gap is a number representing Tailwind spacing scale (e.g., 4 -> gap-4)
    const gapClass = typeof gap === 'number' ? `gap-${gap}` : gap; 

    return (
      // Replace RowV2 with div and dynamically apply Tailwind classes
      <div
        ref={ref}
        className={cn(
          'flex justify-between', // Base flex layout
          alignmentClass,           // Apply dynamic alignment
          gapClass,                 // Apply dynamic gap
          className               // Combine with custom classes
        )}
        {...props}
      >
        {/* Left Content Stack */}
        {hasLeftContent && (
          <div className="flex-1 flex flex-col">
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
             <div className="flex-1">{children}</div>
        )}

        {/* Right Action Area */}
        {action && <div>{action}</div>}
      </div>
    );
  }
);
CardActionRowV2.displayName = 'CardActionRowV2';

export { CardActionRowV2 }; 