import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardDescription as ShadCardDescription,
  CardContent as ShadCardContent,
  CardFooter as ShadCardFooter,
} from '@/components/ui/card';

// Define card variants using cva
const cardVariants = cva(
  'rounded-lg', // Base class applied to all variants
  {
    variants: {
      variant: {
        default: 'border bg-card text-card-foreground shadow-sm', // Standard shadcn style
        elevated: 'border bg-card text-card-foreground shadow-lg', // More prominent shadow
        flat: 'bg-card text-card-foreground', // No border or shadow
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Extend HTMLAttributes and add our variant props
export interface CardV2Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'>, // Omit conflicting title & content attributes
    VariantProps<typeof cardVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const CardV2 = React.forwardRef<HTMLDivElement, CardV2Props>(
  (
    {
      className,
      variant, // Destructure the new variant prop
      title,
      description,
      content,
      footer,
      headerProps,
      contentProps,
      footerProps,
      children,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || description;
    const hasContent = content || children;

    return (
      // Apply the variant classes to the main ShadCard component
      <ShadCard ref={ref} className={cn(cardVariants({ variant }), className)} {...props}>
        {hasHeader && (
          <ShadCardHeader {...headerProps}>
            {title && <ShadCardTitle>{title}</ShadCardTitle>}
            {description && (
              <ShadCardDescription>{description}</ShadCardDescription>
            )}
          </ShadCardHeader>
        )}
        {hasContent && (
          <ShadCardContent {...contentProps}>
            {content || children}
          </ShadCardContent>
        )}
        {footer && (
          <ShadCardFooter {...footerProps}>{footer}</ShadCardFooter>
        )}
      </ShadCard>
    );
  }
);
CardV2.displayName = 'CardV2';

export { CardV2, cardVariants }; // Export variants if needed elsewhere 