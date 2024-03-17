import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "yinline-flex yitems-center yrounded-md yborder ypx-2.5 ypy-0.5 ytext-xs yfont-semibold ytransition-colors focus:youtline-none focus:yring-2 focus:yring-ring focus:yring-offset-2",
  {
    variants: {
      variant: {
        default:
          "yborder-transparent ybg-primary ytext-primary-foreground yshadow hover:ybg-primary/80",
        secondary:
          "yborder-transparent ybg-secondary ytext-secondary-foreground hover:ybg-secondary/80",
        destructive:
          "yborder-transparent ybg-destructive ytext-destructive-foreground yshadow hover:ybg-destructive/80",
        outline: "ytext-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
