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
    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{title}</p>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {change}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}