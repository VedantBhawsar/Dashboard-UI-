import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const events = [
  { time: "8:30am", title: "Weekly sync", color: "bg-muted" },
  { time: "9:45am", title: "Project kickoff", color: "bg-muted" },
  { time: "8:00am", title: "Break", color: "bg-muted" },
]

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const calendarDays = [7, 8, 9, 10, 11, 12, 13]

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 9)) // July 2025

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CardTitle>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map(day => (
            <div key={day} className="text-xs text-muted-foreground font-medium p-2">
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={day}
              className={`text-sm p-2 rounded-md cursor-pointer hover:bg-accent ${day === 9 ? "bg-primary text-primary-foreground font-medium" : ""
                }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
              <div className={`w-2 h-2 rounded-full ${event.color}`} />
              <div className="flex-1">
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-muted-foreground">{event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}