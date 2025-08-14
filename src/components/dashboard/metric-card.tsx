import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
}

export function MetricCard({ title, value, change, isPositive }: MetricCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-primary/20">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{title}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" />
            </div>
            <p className="text-2xl font-bold group-hover:text-primary transition-colors">{value}</p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-success group-hover:scale-110 transition-transform" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive group-hover:scale-110 transition-transform" />
              )}
              <span className={`text-xs font-medium transition-all ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {change}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}