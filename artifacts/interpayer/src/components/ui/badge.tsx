import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "gold";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20": variant === "default",
          "bg-gradient-gold text-primary-foreground border-transparent shadow-sm": variant === "gold",
          "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80": variant === "secondary",
          "text-foreground border border-border": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
