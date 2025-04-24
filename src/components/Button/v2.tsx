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
      // Fixed size for V2
      size: {
        default: "h-9 px-4 py-2", // Standard padding
        iconLeading: "h-9 pl-3 pr-4 py-2", // Less padding before icon
        iconTrailing: "h-9 pl-4 pr-3 py-2", // Less padding after icon
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
)

export interface ButtonV2Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariantsV2>, 'size'> // Exclude size from external props
{
  asChild?: boolean
  icon?: React.ReactNode
  iconPosition?: 'leading' | 'trailing'
}

const ButtonV2 = React.forwardRef<HTMLButtonElement, ButtonV2Props>(
  ({ className, variant, icon, iconPosition = 'leading', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // Determine size variant based on icon presence and position
    const size = icon ? (iconPosition === 'leading' ? 'iconLeading' : 'iconTrailing') : 'default';

    return (
      <Comp
        className={cn(buttonVariantsV2({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* REMOVED MARGIN SPANS */} 
        {icon && iconPosition === 'leading' && icon}
        {children}
        {icon && iconPosition === 'trailing' && icon}
      </Comp>
    )
  }
)
ButtonV2.displayName = "ButtonV2"

export { ButtonV2, buttonVariantsV2 } 