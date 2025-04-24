import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardDescription as ShadCardDescription,
  CardContent as ShadCardContent,
  CardFooter as ShadCardFooter,
} from '@/components/ui/card'; // Import the base shadcn components

export interface CardV1Props extends React.HTMLAttributes<HTMLDivElement> {
  cardTitle?: React.ReactNode;
  description?: React.ReactNode;
  cardContent?: React.ReactNode;
  footer?: React.ReactNode;
  // Allow passing props specifically to the header, content, and footer wrappers
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const CardV1 = React.forwardRef<HTMLDivElement, CardV1Props>(
  (
    {
      className,
      cardTitle,
      description,
      cardContent,
      footer,
      headerProps,
      contentProps,
      footerProps,
      children, // Allow direct children as fallback or alternative to props
      ...props
    },
    ref
  ) => {
    // Determine if there's any header content
    const hasHeader = cardTitle || description;
    // Determine if there's main content (either via prop or direct children)
    const hasContent = cardContent || children;

    return (
      <ShadCard ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
        {hasHeader && (
          <ShadCardHeader {...headerProps}>
            {cardTitle && <ShadCardTitle>{cardTitle}</ShadCardTitle>}
            {description && (
              <ShadCardDescription>{description}</ShadCardDescription>
            )}
          </ShadCardHeader>
        )}
        {hasContent && (
          <ShadCardContent className="flex-1" {...contentProps}>
            {cardContent || children}
          </ShadCardContent>
        )}
        {footer && (
          <ShadCardFooter {...footerProps}>
            {footer}
          </ShadCardFooter>
        )}
      </ShadCard>
    );
  }
);
CardV1.displayName = 'CardV1';

export { CardV1 }; 