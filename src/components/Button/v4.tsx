import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react'; // Loader icon

import { cn } from '@/lib/utils';

// V4 adds a 'conversational' variant with fill options
const buttonVariantsV4 = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // New 'conversational' base styles (transparent background, define text color)
        conversational: 'text-teal-600 dark:text-teal-400', 
      },
      fill: { // Fill variations, primarily for 'conversational'
        solid: '', // Applied via compoundVariants
        outline: '', // Applied via compoundVariants
        ghost: '', // Applied via compoundVariants
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8 text-base',
      },
    },
    compoundVariants: [
      // Apply fill styles ONLY when variant is 'conversational'
      {
        variant: 'conversational',
        fill: 'solid',
        className: 'bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:text-teal-950 dark:hover:bg-teal-600',
      },
      {
        variant: 'conversational',
        fill: 'outline',
        className: 'border border-teal-600 hover:bg-teal-100/50 dark:border-teal-400 dark:hover:bg-teal-900/20',
      },
      {
        variant: 'conversational',
        fill: 'ghost',
        className: 'hover:bg-teal-100/50 dark:hover:bg-teal-900/20',
      },
      // Default variant doesn't use fill, so make fill='solid' by default for it
      {
        variant: 'default',
        fill: 'solid', // Only 'solid' makes sense for the original default
        className: '', // No extra classes needed, base 'default' handles it
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fill: 'solid', // Default fill, relevant for 'conversational' mostly
    },
  }
);

// V4 Props: Add 'fill', keep 'loading' and 'icon'/'iconPosition'
export interface ButtonV4Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsV4> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'leading' | 'trailing';
}

const ButtonV4 = React.forwardRef<HTMLButtonElement, ButtonV4Props>(
  (
    {
      className,
      variant,
      size,
      fill, // Add fill prop
      asChild = false,
      loading = false,
      icon,
      iconPosition = 'leading', // Default icon position
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    // Icon handling: Render icon directly within a styled span
    const renderIcon = () => {
      if (loading) {
        return <span className={cn("inline-block size-4 animate-spin", children ? "mr-2" : "")}> <Loader2 /> </span>;
      } 
      if (icon) {
        return <span className={cn("inline-block size-4", children && iconPosition === 'leading' && 'mr-2', children && iconPosition === 'trailing' && 'ml-2')}>{icon}</span>;
      }
      return null;
    };

    return (
      <Comp
        className={cn(buttonVariantsV4({ variant, size, fill, className }))} // Pass fill to cva
        ref={ref}
        disabled={loading || props.disabled} // Disable if loading
        {...props}
      >
        {iconPosition === 'leading' && renderIcon()}
        {children}
        {iconPosition === 'trailing' && renderIcon()}
      </Comp>
    );
  }
);
ButtonV4.displayName = 'ButtonV4';

export { ButtonV4, buttonVariantsV4 }; 