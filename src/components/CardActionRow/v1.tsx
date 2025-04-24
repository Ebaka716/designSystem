import * as React from 'react';
import { cn } from '@/lib/utils';
// import { RowV2 } from '@/components/Row/v2'; // Removed

export interface CardActionRowV1Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary text content (e.g., title, label) - aligned left */
  primaryText?: React.ReactNode;
  /** Secondary text content (e.g., subtitle, description) - aligned left, below primary */
  secondaryText?: React.ReactNode;
  /** Action content (e.g., Button, Icon) - aligned right */
  action?: React.ReactNode;

  // Allow passing props specifically to the internal RowV2 - Removed
  // rowProps?: React.ComponentProps<typeof RowV2>;
}

const CardActionRowV1 = React.forwardRef<
  HTMLDivElement,
  CardActionRowV1Props
>(
  (
    {
      className,
      primaryText,
      secondaryText,
      action,
      // rowProps, // Removed
      children, 
      ...props
    },
    ref
  ) => {
    const hasLeftContent = primaryText || secondaryText;

    return (
      // Replace RowV2 with div and Tailwind classes
      <div
        ref={ref} 
        className={cn(
          'flex justify-between items-center gap-4', // Apply base flex layout
          className // Combine with custom classes
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

        {/* Render direct children if no specific content provided */}
        {!hasLeftContent && !action && children && (
             <div className="flex-1">{children}</div>
        )}

        {/* Right Action Area */}
        {action && <div>{action}</div>}
      </div>
    );
  }
);
CardActionRowV1.displayName = 'CardActionRowV1';

export { CardActionRowV1 }; 