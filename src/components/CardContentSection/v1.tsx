import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardContentSectionV1Props extends React.HTMLAttributes<HTMLDivElement> {
  // No specific props for V1, just standard div attributes + children
}

const CardContentSectionV1 = React.forwardRef<
  HTMLDivElement,
  CardContentSectionV1Props
>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        // Apply consistent bottom margin for spacing. Defaults to mb-4.
        // Consider making this configurable or smarter in later versions.
        className={cn('mb-4', className)} 
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardContentSectionV1.displayName = 'CardContentSectionV1';

export { CardContentSectionV1 }; 