import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardContentSectionV2Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional title displayed above the section content. */
  sectionTitle?: React.ReactNode;
  /** Props passed to the title wrapper element */
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>; 
}

const CardContentSectionV2 = React.forwardRef<
  HTMLDivElement,
  CardContentSectionV2Props
>(
  ({ className, sectionTitle, titleProps, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        // Apply consistent bottom margin for spacing between sections
        className={cn('mb-4', className)} 
        {...props}
      >
        {sectionTitle && (
          <h4 
            {...titleProps} // Spread any title-specific props
            // Apply styling to the title, add bottom margin if there's content below
            className={cn(
              'text-sm font-medium text-card-foreground mb-2', 
              titleProps?.className
            )}
          >
            {sectionTitle}
          </h4>
        )}
        {children}
      </div>
    );
  }
);
CardContentSectionV2.displayName = 'CardContentSectionV2';

export { CardContentSectionV2 }; 