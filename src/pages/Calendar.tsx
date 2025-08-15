import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { CreateEventSheet } from "@/components/create-event-sheet";
import { format, startOfWeek, addDays, isSameDay, startOfDay, addHours } from "date-fns";

interface Event {
  id: number
  title: string
  startTime: string
  endTime: string
  date: string
  description?: string
  tag: string
  guests?: string[]
  meetingLink?: string
}

const initialEvents: Event[] = [
  { id: 1, title: "Project kickoff", startTime: "09:45", endTime: "10:45", date: "2025-07-01", tag: "blue", description: "Kickoff meeting for the new project." },
  { id: 2, title: "Break", startTime: "08:00", endTime: "08:30", date: "2025-07-09", tag: "green" },
  { id: 3, title: "File taxes", startTime: "11:00", endTime: "12:00", date: "2025-07-09", tag: "orange" },
  { id: 4, title: "Sales Meeting", startTime: "15:30", endTime: "16:30", date: "2025-07-10", tag: "orange", description: "This is our weekly sales meeting to review pipeline progress, discuss key deals, share updates, and align on targets." },
  { id: 5, title: "Weekly sync", startTime: "08:30", endTime: "09:30", date: "2025-07-07", tag: "blue" },
  { id: 6, title: "Meet accounting", startTime: "08:30", endTime: "09:30", date: "2025-07-14", tag: "purple" },
  { id: 7, title: "Gia's birthday", startTime: "16:00", endTime: "18:00", date: "2025-07-16", tag: "red" },
];

const tagColors: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  red: "bg-red-100 text-red-700 border-red-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 9)); // July 2025
  const [view, setView] = useState("Month");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "view" | "edit">("create");
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getEventsForDateAndTime = (date: string, hour: number) => {
    return events.filter(event => {
      if (event.date !== date) return false;
      const eventHour = parseInt(event.startTime.split(':')[0]);
      return eventHour === hour;
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === "Month") {
        newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      } else if (view === "Week") {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      } else if (view === "Day") {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 1 : -1));
      }
      return newDate;
    });
  };

  const getDateRangeText = () => {
    if (view === "Month") {
      return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else if (view === "Week") {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
      const weekEnd = addDays(weekStart, 6);
      return `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}`;
    } else {
      return format(currentDate, "MMMM d, EEEE");
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSheetMode("view");
    setSheetOpen(true);
  };

  const handleCreateEvent = () => {
    setSelectedEvent(undefined);
    setSheetMode("create");
    setSheetOpen(true);
  };

  const handleSaveEvent = (eventData: Event) => {
    if (eventData.id) {
      // Update existing event
      setEvents(prev => prev.map(e => e.id === eventData.id ? eventData : e));
    } else {
      // Create new event
      const newEvent = { ...eventData, id: Date.now() };
      setEvents(prev => [...prev, newEvent]);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const renderMonthView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const startDay = firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday = 0 to Monday = 0
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateStr);
      
      days.push(
        <div key={day} className="p-2 min-h-[120px] border border-border/40 hover:bg-muted/50 transition-colors">
          <div className="font-medium text-sm mb-2">{day}</div>
          <div className="space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className={`text-xs p-2 rounded cursor-pointer border ${tagColors[event.tag] || tagColors.blue} hover:opacity-80 transition-opacity`}
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>{event.startTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 min-h-[600px]">
        {days}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <div className="grid grid-cols-8 min-h-[600px]">
        {/* Time column */}
        <div className="border-r border-border">
          <div className="h-12 border-b border-border"></div>
          {timeSlots.map(time => (
            <div key={time} className="h-16 border-b border-border/50 p-2 text-xs text-muted-foreground">
              {time === "7:00" ? "7 AM" : 
               time === "8:00" ? "8 AM" :
               time === "9:00" ? "9 AM" :
               time === "10:00" ? "10 AM" :
               time === "11:00" ? "11 AM" :
               time === "12:00" ? "12 PM" :
               time === "13:00" ? "1 PM" :
               time === "14:00" ? "2 PM" :
               time === "15:00" ? "3 PM" :
               time === "16:00" ? "4 PM" : ""}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIndex) => {
          const dayStr = format(day, "yyyy-MM-dd");
          const dayEvents = getEventsForDate(dayStr);
          
          return (
            <div key={dayIndex} className="border-r border-border last:border-r-0">
              {/* Day header */}
              <div className="h-12 border-b border-border p-2 text-center">
                <div className="text-xs text-muted-foreground">{format(day, "EEE, d")}</div>
                <div className={`text-lg font-medium ${format(day, "d") === "9" ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center mx-auto" : ""}`}>
                  {format(day, "d")}
                </div>
              </div>
              
              {/* Time slots */}
              {timeSlots.map((time, timeIndex) => {
                const hour = parseInt(time.split(':')[0]);
                const slotEvents = getEventsForDateAndTime(dayStr, hour);
                
                return (
                  <div key={time} className="h-16 border-b border-border/50 p-1 relative">
                    {slotEvents.map(event => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`text-xs p-1 rounded cursor-pointer border ${tagColors[event.tag] || tagColors.blue} hover:opacity-80 transition-opacity mb-1`}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-2 w-2" />
                          <span>{event.startTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayStr = format(currentDate, "yyyy-MM-dd");
    const dayEvents = getEventsForDate(dayStr);

    return (
      <div className="grid grid-cols-1 min-h-[600px]">
        {timeSlots.map((time, timeIndex) => {
          const hour = parseInt(time.split(':')[0]);
          const slotEvents = getEventsForDateAndTime(dayStr, hour);
          
          return (
            <div key={time} className="border-b border-border/50 p-4 min-h-[80px] flex items-start gap-4">
              <div className="w-16 text-xs text-muted-foreground pt-2">
                {time === "7:00" ? "7 AM" : 
                 time === "8:00" ? "8 AM" :
                 time === "9:00" ? "9 AM" :
                 time === "10:00" ? "10 AM" :
                 time === "11:00" ? "11 AM" :
                 time === "12:00" ? "12 PM" :
                 time === "13:00" ? "1 PM" :
                 time === "14:00" ? "2 PM" :
                 time === "15:00" ? "3 PM" :
                 time === "16:00" ? "4 PM" : ""}
              </div>
              <div className="flex-1">
                {slotEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event)}
                    className={`p-3 rounded cursor-pointer border ${tagColors[event.tag] || tagColors.blue} hover:opacity-80 transition-opacity mb-2 w-full`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="flex items-center gap-1 mt-1 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{event.startTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex-none p-4 md:p-8 pt-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Calendar</h2>
            <p className="text-muted-foreground">
              View and manage your scheduled events.
            </p>
          </div>
          <Button onClick={handleCreateEvent} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-xl font-semibold min-w-[200px]">
                {getDateRangeText()}
              </h3>
              <Button variant="ghost" size="sm" onClick={() => navigateDate('next')}>
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
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-auto">
        <Card className="h-full rounded-none border-x-0 border-b-0">
          <CardContent className="p-0 h-full">
            {view === "Month" && (
              <div className="h-full">
                <div className="grid grid-cols-7 border-b border-border bg-muted/50">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="p-4 font-medium text-center text-sm text-muted-foreground border-r border-border last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                {renderMonthView()}
              </div>
            )}
            {view === "Week" && renderWeekView()}
            {view === "Day" && renderDayView()}
          </CardContent>
        </Card>
      </div>

      {/* Event Sheet */}
      <CreateEventSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        mode={sheetMode}
        event={selectedEvent}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}