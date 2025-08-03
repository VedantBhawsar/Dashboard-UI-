import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const events = [
  { id: 1, title: "Project kickoff", time: "9:45am", date: "2025-01-01", type: "meeting" },
  { id: 2, title: "Break", time: "12:00pm", date: "2025-01-03", type: "break" },
  { id: 3, title: "Sales Meeting", time: "03:30pm", date: "2025-01-04", type: "meeting" },
  { id: 4, title: "Mark's game", time: "8:00am", date: "2025-01-05", type: "personal" },
  { id: 5, title: "Weekly sync", time: "8:30am", date: "2025-01-07", type: "meeting" },
  { id: 6, title: "Break", time: "8:00am", date: "2025-01-09", type: "break" },
  { id: 7, title: "File taxes", time: "11:00am", date: "2025-01-09", type: "task" },
  { id: 8, title: "Sales Meeting", time: "03:30pm", date: "2025-01-10", type: "meeting" },
  { id: 9, title: "Meet accounting", time: "8:30am", date: "2025-01-14", type: "meeting" },
  { id: 10, title: "Gia's birthday", time: "04:00pm", date: "2025-01-15", type: "personal" },
  { id: 11, title: "Break", time: "12:00pm", date: "2025-01-17", type: "break" },
  { id: 12, title: "Meet accounting", time: "8:30am", date: "2025-01-18", type: "meeting" },
];

const eventTypeColors = {
  meeting: "default",
  break: "secondary",
  personal: "outline",
  task: "destructive",
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("Month");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      days.push(
        <div key={day} className="p-2 min-h-[100px] border border-border/40 hover:bg-muted/50 transition-colors">
          <div className="font-medium text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="text-xs p-1 rounded bg-primary/10 text-primary border border-primary/20 truncate"
              >
                <div className="font-medium">{event.title}</div>
                <div className="text-muted-foreground">{event.time}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Calendar</h2>
          <p className="text-muted-foreground">
            View and manage your scheduled events.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          {["Month", "Week", "Day"].map((viewType) => (
            <Button
              key={viewType}
              variant={view === viewType ? "default" : "outline"}
              size="sm"
              onClick={() => setView(viewType)}
            >
              {viewType}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b border-border">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="p-4 font-medium text-center text-sm text-muted-foreground border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {renderCalendarDays()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}