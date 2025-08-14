import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function UserAcquisition() {
  return (
    <Card className="col-span-3 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="group-hover:text-primary transition-colors">User acquisition</CardTitle>
        <Select defaultValue="Month">
          <SelectTrigger className="w-24 hover:border-primary transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
            <SelectItem value="Year">Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="text-3xl font-bold">64.28%</div>
            <div className="text-sm text-muted-foreground mb-1">of 4,000 users</div>
          </div>
          <Progress value={64.28} className="h-2 transition-all duration-500 hover:h-3" />
        </div>
      </CardContent>
    </Card>
  )
}