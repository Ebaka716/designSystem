import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardContentSectionV3Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional title displayed above the section content. */
  sectionTitle?: React.ReactNode;
  /** Props passed to the title wrapper element */
  titleProps?: React.HTMLAttributes<HTMLHeadingElement>;
  /** If true, adds a top border and padding to separate from the section above. */
  divider?: boolean;
}

const CardContentSectionV3 = React.forwardRef<
  HTMLDivElement,
  CardContentSectionV3Props
>(
  ({ className, sectionTitle, titleProps, children, divider = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        // Apply consistent bottom margin, plus top border/padding if divider is true
        className={cn(
          'mb-4', // Spacing below the section
          divider && 'border-t pt-4', // Add divider and space above if requested
          className
        )}
        {...props}
      >
        {sectionTitle && (
          <h4
            {...titleProps}
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
CardContentSectionV3.displayName = 'CardContentSectionV3';

export { CardContentSectionV3 }; 