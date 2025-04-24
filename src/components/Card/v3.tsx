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

// --- Variant Definitions ---

// Card appearance variants (from V2)
const cardVariants = cva(
  'rounded-lg', 
  {
    variants: {
      variant: {
        default: 'border bg-card text-card-foreground shadow-sm',
        elevated: 'border bg-card text-card-foreground shadow-lg',
        flat: 'bg-card text-card-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Padding size variants for card sections
const paddingVariants = cva(
  '', // Base class (padding applied by specific section variants)
  {
    variants: {
      paddingSize: {
        sm: 'p-3',      // Small padding
        default: 'p-6', // Default padding (like shadcn default)
        lg: 'p-8',      // Large padding
      },
    },
    defaultVariants: {
      paddingSize: 'default',
    },
  }
);

// Specific padding for header (Now standardized)
const headerPaddingVariants = cva(
  '', // Base class
  {
    variants: {
      paddingSize: {
        sm: 'p-3', 
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      paddingSize: 'default',
    },
  }
);

// Specific padding for footer (Now standardized)
const footerPaddingVariants = cva(
  '', // Base class
  {
    variants: {
      paddingSize: {
        sm: 'p-3', 
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      paddingSize: 'default',
    },
  }
);


// --- Component Definition ---

export interface CardV3Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'>,
    VariantProps<typeof cardVariants>,
    VariantProps<typeof paddingVariants> // Add paddingSize prop type
{
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  icon?: React.ReactNode; // Optional icon for the header
  action?: React.ReactNode; // Optional action element for the footer
  headerProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  footerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const CardV3 = React.forwardRef<HTMLDivElement, CardV3Props>(
  (
    {
      className,
      variant,
      paddingSize,
      title,
      description,
      icon,
      content,
      footer,
      action,
      headerProps,
      contentProps,
      footerProps,
      children,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || description || icon;
    const hasContent = content || children;
    const hasFooter = footer || action;

    return (
      <ShadCard ref={ref} className={cn(cardVariants({ variant }), className)} {...props}>
        {hasHeader && (
          <ShadCardHeader
            className={cn(headerPaddingVariants({ paddingSize }), headerProps?.className)}
            {...headerProps}
          >
            <div className="flex justify-between items-start gap-4">
              {/* Title/Description Group */}
              <div className="flex-1">
                {title && <ShadCardTitle>{title}</ShadCardTitle>}
                {description && (
                  <ShadCardDescription className={cn({ 'mt-1': title })}>
                    {description}
                  </ShadCardDescription>
                )}
              </div>
              {/* Icon Slot */}
              {icon && <div className="text-muted-foreground">{icon}</div>}
            </div>
          </ShadCardHeader>
        )}

        {hasContent && (
          <ShadCardContent
            className={cn(paddingVariants({ paddingSize }), contentProps?.className)}
            {...contentProps}
          >
            {content || children}
          </ShadCardContent>
        )}

        {hasFooter && (
          <ShadCardFooter
            className={cn(footerPaddingVariants({ paddingSize }), footerProps?.className)}
            {...footerProps}
          >
            <div className="flex justify-between items-center gap-4 w-full">
              {/* Footer Content Slot */}
              <div className="flex-1 text-sm text-muted-foreground">
                {footer}
              </div>
              {/* Action Slot */}
              {action && <div>{action}</div>}
            </div>
          </ShadCardFooter>
        )}
      </ShadCard>
    );
  }
);
CardV3.displayName = 'CardV3';

export { CardV3, cardVariants, paddingVariants }; 