import { Card, CardContent } from "./card"
import { cn } from "../../lib/utils"
import { LucideIcon } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: string
  change?: {
    value: string
    isPositive: boolean
    icon: LucideIcon
  }
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "primary"
  className?: string
}

const cardVariants = {
  default: "bg-gradient-card border-border/50 shadow-card hover:shadow-metric",
  success: "bg-gradient-success border-success/20 shadow-card hover:shadow-[0_8px_32px_hsl(142_76%_36%/0.3)]",
  warning: "bg-gradient-warning border-warning/20 shadow-card hover:shadow-[0_8px_32px_hsl(38_92%_50%/0.3)]",
  primary: "bg-gradient-primary border-primary/20 shadow-card hover:shadow-glow"
}

const iconVariants = {
  default: "bg-primary-100 text-primary-600",
  success: "bg-green-100 text-green-600",
  warning: "bg-warning-muted/10 text-warning", 
  primary: "bg-primary-muted/10 text-primary"
}

export function AnalyticsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = "default",
  className 
}: AnalyticsCardProps) {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm",
      cardVariants[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                <change.icon className={cn(
                  "h-4 w-4",
                  change.isPositive ? "text-success" : "text-destructive"
                )} />
                <span className={cn(
                  "text-sm font-medium",
                  change.isPositive ? "text-success" : "text-destructive"
                )}>
                  {change.isPositive ? "+" : ""}{change.value}%
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm",
            iconVariants[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
