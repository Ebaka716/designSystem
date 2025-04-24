import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariantsV2 = cva(
  // Base styles adjusted for icon integration - ADDED GAP HERE
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
      },
      // Add standard sizes
      size: {
        default: "h-9 px-4 py-2", // Standard padding
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8", // Use text-base implicitly from base
      },
      // Add iconPosition as a primary variant
      iconPosition: {
        leading: "",
        trailing: "",
        none: "", // For when there is no icon
      },
      // Internal variant to track if icon is present
      hasIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Adjust padding for sm size with leading icon
      { size: "sm", hasIcon: true, iconPosition: "leading", className: "pl-2 pr-3" }, 
      { size: "sm", hasIcon: true, iconPosition: "trailing", className: "pl-3 pr-2" },
      // Adjust padding for default size with leading icon
      { size: "default", hasIcon: true, iconPosition: "leading", className: "pl-3 pr-4" },
      { size: "default", hasIcon: true, iconPosition: "trailing", className: "pl-4 pr-3" },
      // Adjust padding for lg size with leading icon
      { size: "lg", hasIcon: true, iconPosition: "leading", className: "pl-6 pr-8" },
      { size: "lg", hasIcon: true, iconPosition: "trailing", className: "pl-8 pr-6" },
    ],
    defaultVariants: {
      variant: "outline",
      size: "default",
      hasIcon: false,
      iconPosition: "none", // Default to none
    },
  }
)

export interface ButtonV2Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsV2> 
{
  asChild?: boolean
  icon?: React.ReactNode
  // iconPosition is now handled by VariantProps
}

const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonV2Props>(
  ({ className, variant, size, icon, iconPosition: propIconPosition = 'leading', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasIcon = !!icon;
    // Determine the iconPosition variant value for cva
    const cvaIconPosition = hasIcon ? propIconPosition : 'none'; 

    // Render icon directly (span wrapper added for consistency)
    const renderIcon = () => {
       if (icon) {
        return <span className={cn("inline-flex items-center justify-center size-4")}>{icon}</span>;
      }
      return null;
    };

    return (
      <Comp
        // Pass correct iconPosition variant value
        className={cn(buttonVariantsV2({ variant, size, hasIcon, iconPosition: cvaIconPosition, className }))}
        ref={ref}
        {...props}
      >
        {/* Use propIconPosition for rendering logic */} 
        {hasIcon && propIconPosition === 'leading' && renderIcon()}
        {children}
        {hasIcon && propIconPosition === 'trailing' && renderIcon()}
      </Comp>
    )
  }
)
ButtonV2.displayName = "ButtonV2"

export { ButtonV2, buttonVariantsV2 } 