import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from 'lucide-react'

import { cn } from "@/lib/utils"

const buttonVariantsV2 = cva(
  // Base styles adjusted for icon integration - ADDED GAP HERE
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        conversational: 'text-teal-600 dark:text-teal-400',
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
      // ADDED fill prop
      fill: {
        solid: '',
        outline: '',
        ghost: '',
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
      // --- Conversational Variant Styling --- 
      // Override base rounding and apply fill styles ONLY when variant is conversational
      {
        variant: 'conversational',
        fill: 'solid',
        className: 'rounded-md rounded-bl-none bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:text-teal-950 dark:hover:bg-teal-600', // Added rounding override
      },
      {
        variant: 'conversational',
        fill: 'outline',
        className: 'rounded-md rounded-bl-none border border-teal-600 hover:bg-teal-100/50 dark:border-teal-400 dark:hover:bg-teal-900/20', // Added rounding override
      },
      {
        variant: 'conversational',
        fill: 'ghost',
        className: 'rounded-md rounded-bl-none hover:bg-teal-100/50 dark:hover:bg-teal-900/20', // Added rounding override
      },
      // Ensure fill prop doesn't affect non-conversational variants (redundant but safe)
      // Also ensure standard variants keep standard rounding
      {
        variant: ['default', 'outline', 'ghost'],
        fill: ['solid', 'outline', 'ghost'],
        className: 'rounded-md' // Ensure standard rounding applies if not conversational
      }
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      fill: "solid",
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
  loading?: boolean
  // iconPosition is now handled by VariantProps
}

const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonV2Props>(
  ({ className, variant, size, fill, icon, iconPosition: propIconPosition = 'leading', loading = false, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const hasIcon = !!icon;
    // Determine the iconPosition variant value for cva
    const cvaIconPosition = hasIcon && !loading ? propIconPosition : 'none'; // Also check loading

    // Render icon or loader
    const renderIconOrLoader = () => {
      if (loading) {
        // Use Loader2, adjust spacing based on children presence
        // Determine margin based on combined factors: children, iconPosition
        const marginClass = children ? (propIconPosition === 'leading' ? "mr-2" : "ml-2") : "";
        return <span className={cn("inline-flex items-center justify-center size-4 animate-spin", marginClass)}> <Loader2 /> </span>;
      } 
      if (icon) {
         // Original icon rendering, adjust spacing based on children presence
         const marginClass = children ? (propIconPosition === 'leading' ? "mr-2" : "ml-2") : "";
         return <span className={cn("inline-flex items-center justify-center size-4", marginClass)}>{icon}</span>;
      }
      return null;
    };

    return (
      <Comp
        // Pass fill to cva, ensure iconPosition is handled correctly with loading
        className={cn(buttonVariantsV2({ variant, size, fill, hasIcon: hasIcon && !loading, iconPosition: cvaIconPosition, className }))}
        ref={ref}
        disabled={loading || props.disabled} // <-- Disable if loading
        {...props}
      >
        {/* Use propIconPosition for rendering logic, prioritize loader */}
        {propIconPosition === 'leading' && renderIconOrLoader()}
        {!loading && children} { /* <-- Conditionally render children */ }
        {propIconPosition === 'trailing' && renderIconOrLoader()}
      </Comp>
    )
  }
)
ButtonV2.displayName = "ButtonV2"

export { ButtonV2, buttonVariantsV2 } 