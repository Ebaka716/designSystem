import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariantsV1 = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        default: // Primary
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      },
      size: { // Add sm and lg sizes
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonV1Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsV1> {
  asChild?: boolean
  icon?: React.ReactElement
  iconPosition?: 'leading' | 'trailing'
}

const ButtonV1 = React.forwardRef<HTMLButtonElement, ButtonV1Props>(
  ({ className, variant, size = "default", asChild = false, icon, iconPosition = 'leading', children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const renderIcon = () => {
      if (icon) {
        return <span className={cn("inline-flex items-center justify-center size-4")}>{icon}</span>
      }
      return null
    }

    return (
      <Comp
        className={cn(buttonVariantsV1({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconPosition === 'leading' && renderIcon()}
        {children}
        {iconPosition === 'trailing' && renderIcon()}
      </Comp>
    )
  }
)
ButtonV1.displayName = "ButtonV1"

export { ButtonV1, buttonVariantsV1 } 