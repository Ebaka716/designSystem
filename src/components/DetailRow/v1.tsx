import * as React from 'react';
import { cn } from '@/lib/utils';

// Define the props for the reusable DetailRow component
export interface DetailRowV1Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary text content (e.g., title, label) */
  primaryText?: React.ReactNode;
  /** Secondary text content (e.g., subtitle, description) */
  secondaryText?: React.ReactNode;
  /** Custom content for the left side (overrides primary/secondaryText) */
  primaryContent?: React.ReactNode;
  /** Action content (e.g., Button, Icon, Text) - aligned right */
  actionContent?: React.ReactNode;
}

const DetailRowV1 = React.forwardRef<HTMLDivElement, DetailRowV1Props>(
  (
    {
      className,
      primaryText,
      secondaryText,
      primaryContent,
      actionContent,
      ...props
    },
    ref
  ) => {
    const hasLeftContent = primaryContent || primaryText || secondaryText;

    return (
      <div
        ref={ref}
        className={cn(
          'flex justify-between items-center w-full py-2', // Basic layout
          className
        )}
        {...props}
      >
        {/* Left Content Area */}
        {hasLeftContent && (
          primaryContent ? (
            <div className="flex-1 mr-4">
              {primaryContent}
            </div>
          ) : (
            <div className="flex flex-col flex-1 mr-4">
              {primaryText && (
                <span className="text-sm font-medium text-foreground truncate">
                  {primaryText}
                </span>
              )}
              {secondaryText && (
                <span className={cn(
                    "text-sm text-muted-foreground truncate",
                    primaryText && "mt-0.5"
                )}>
                  {secondaryText}
                </span>
              )}
            </div>
          )
        )}

        {/* Right: Action Content */}
        {actionContent && (
          <div className="flex-shrink-0"> {/* Prevent action from shrinking */} 
            {actionContent}
          </div>
        )}
      </div>
    );
  }
);
DetailRowV1.displayName = 'DetailRowV1';

export { DetailRowV1 }; 