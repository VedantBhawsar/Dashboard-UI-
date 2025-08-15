import { useState } from "react"
import { CalendarIcon, Clock, Link, Users, X, Edit, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Event {
  id?: number
  title: string
  date: string
  startTime: string
  endTime: string
  guests?: string[]
  meetingLink?: string
  description?: string
  tag: string
}

interface CreateEventSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "create" | "view" | "edit"
  event?: Event
  onSave: (event: Event) => void
  onDelete?: (id: number) => void
}

const tagColors = [
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  { name: "Red", value: "red", class: "bg-red-500" },
  { name: "Yellow", value: "yellow", class: "bg-yellow-500" },
]

const mockGuests = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg", email: "john@example.com" },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg", email: "jane@example.com" },
]

export function CreateEventSheet({ open, onOpenChange, mode, event, onSave, onDelete }: CreateEventSheetProps) {
  const [isEditing, setIsEditing] = useState(mode === "create" || mode === "edit")
  const [formData, setFormData] = useState<Event>(() => ({
    title: event?.title || "",
    date: event?.date || format(new Date(), "yyyy-MM-dd"),
    startTime: event?.startTime || "09:00",
    endTime: event?.endTime || "10:00",
    guests: event?.guests || [],
    meetingLink: event?.meetingLink || "",
    description: event?.description || "",
    tag: event?.tag || "blue",
  }))
  const [calendarDate, setCalendarDate] = useState<Date>(() => 
    event?.date ? new Date(event.date) : new Date()
  )

  const handleSave = () => {
    onSave({ ...formData, id: event?.id })
    onOpenChange(false)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id)
      onOpenChange(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (mode === "create") {
      onOpenChange(false)
    } else {
      setIsEditing(false)
      setFormData({
        title: event?.title || "",
        date: event?.date || format(new Date(), "yyyy-MM-dd"),
        startTime: event?.startTime || "09:00",
        endTime: event?.endTime || "10:00",
        guests: event?.guests || [],
        meetingLink: event?.meetingLink || "",
        description: event?.description || "",
        tag: event?.tag || "blue",
      })
    }
  }

  const getTitle = () => {
    if (mode === "create") return "Create new event"
    if (isEditing) return event?.title || "Edit event"
    return event?.title || "Event Details"
  }

  const selectedTag = tagColors.find(tag => tag.value === formData.tag)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] max-h-screen overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <div className="flex-1">
            <SheetTitle className="text-xl">{getTitle()}</SheetTitle>
            {!isEditing && mode !== "create" && (
              <SheetDescription className="mt-1">
                Event details and information
              </SheetDescription>
            )}
          </div>
          {mode === "view" && !isEditing && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Event Name */}
          <div className="space-y-2">
            <Label htmlFor="title">Event name</Label>
            {isEditing ? (
              <Input
                id="title"
                placeholder="Enter event name"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            ) : (
              <div className="text-lg font-medium">{formData.title}</div>
            )}
          </div>

          {/* Event Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event date</Label>
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !calendarDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {calendarDate ? format(calendarDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={calendarDate}
                      onSelect={(date) => {
                        setCalendarDate(date || new Date())
                        setFormData({ ...formData, date: format(date || new Date(), "yyyy-MM-dd") })
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(formData.date), "PPP")}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Select value={formData.startTime} onValueChange={(value) => setFormData({ ...formData, startTime: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <span className="text-muted-foreground">—</span>
                  <Select value={formData.endTime} onValueChange={(value) => setFormData({ ...formData, endTime: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                            {`${hour}:00`}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.startTime} - {formData.endTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label>Guests</Label>
            {isEditing ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Add guests
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <Input placeholder="Search people..." />
                    <div className="space-y-2">
                      {mockGuests.map((guest) => (
                        <div key={guest.id} className="flex items-center gap-2 p-2 rounded hover:bg-accent">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={guest.avatar} />
                            <AvatarFallback>{guest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{guest.name}</div>
                            <div className="text-xs text-muted-foreground">{guest.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="flex -space-x-2">
                  {mockGuests.slice(0, 2).map((guest) => (
                    <Avatar key={guest.id} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={guest.avatar} />
                      <AvatarFallback>{guest.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Meeting Link */}
          <div className="space-y-2">
            <Label htmlFor="meetingLink">Meeting link</Label>
            {isEditing ? (
              <div className="relative">
                <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="meetingLink"
                  placeholder="Enter meeting link"
                  className="pl-9"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                />
              </div>
            ) : formData.meetingLink ? (
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-muted-foreground" />
                <a href={formData.meetingLink} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  {formData.meetingLink}
                </a>
              </div>
            ) : null}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            ) : formData.description ? (
              <div className="text-sm text-muted-foreground">{formData.description}</div>
            ) : null}
          </div>

          {/* Meeting Tag */}
          <div className="space-y-2">
            <Label>Tag</Label>
            {isEditing ? (
              <div className="flex gap-2">
                {tagColors.map((tag) => (
                  <button
                    key={tag.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, tag: tag.value })}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all",
                      tag.class,
                      formData.tag === tag.value ? "border-foreground scale-110" : "border-transparent"
                    )}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className={cn("w-4 h-4 rounded-full", selectedTag?.class)} />
                <span className="text-sm capitalize">{selectedTag?.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          {isEditing && (
            <Button onClick={handleSave} className="flex-1">
              {mode === "create" ? "Save" : "Save changes"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}