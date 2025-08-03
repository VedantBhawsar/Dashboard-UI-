import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
  { month: "Jan", value: 80000 },
  { month: "Feb", value: 60000 },
  { month: "Mar", value: 40000 },
  { month: "Apr", value: 50000 },
  { month: "May", value: 70000 },
  { month: "Jun", value: 91000, gross: 91000, net: 85300 },
  { month: "Jul", value: 55000 },
  { month: "Aug", value: 60000 },
  { month: "Sep", value: 30000 },
  { month: "Oct", value: 50000 },
  { month: "Nov", value: 75000 },
  { month: "Dec", value: 85000 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length && label === "Jun") {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Gross</span>
            <span className="text-sm font-bold">$91k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Net</span>
            <span className="text-sm font-bold">$85.3k</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  const [period, setPeriod] = useState("Year")

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Revenue</CardTitle>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Year">Year</SelectItem>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.month === "Jun" ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.8)"} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}