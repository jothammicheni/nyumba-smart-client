import { Card, CardContent } from "./card"
import { cn } from "../../lib/utils"

interface MetricCardProps {
  title: string
  value: string
  subtitle?: string
  variant?: "default" | "success" | "warning" | "primary"
  className?: string
}

const metricVariants = {
  default: "bg-gradient-card border-border/50 shadow-card",
  success: "bg-gradient-success border-success/20 shadow-card",
  warning: "bg-gradient-warning border-warning/20 shadow-card", 
  primary: "bg-gradient-primary border-primary/20 shadow-card"
}

const valueVariants = {
  default: "text-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
  primary: "text-primary-foreground"
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  variant = "default",
  className 
}: MetricCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm",
      metricVariants[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className={cn(
            "text-3xl font-bold tracking-tight",
            valueVariants[variant]
          )}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
