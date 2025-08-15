import { Bell, Check, Clock, User, MessageSquare } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "message" | "system" | "user"
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New message from Sarah",
    description: "Hey, can we schedule a meeting for tomorrow?",
    time: "2 min ago",
    type: "message",
    read: false
  },
  {
    id: "2",
    title: "System Update",
    description: "Your dashboard has been updated with new features",
    time: "1 hour ago",
    type: "system",
    read: false
  },
  {
    id: "3",
    title: "New user registered",
    description: "John Doe has joined your team",
    time: "3 hours ago",
    type: "user",
    read: true
  },
  {
    id: "4",
    title: "Task completed",
    description: "Website redesign project has been completed",
    time: "1 day ago",
    type: "system",
    read: true
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "message":
      return <MessageSquare className="h-4 w-4" />
    case "user":
      return <User className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

export function NotificationsPopup() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        align="end"
        sideOffset={8}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Notifications</h4>
            <Badge variant="secondary">{unreadCount} new</Badge>
          </div>
        </div>
        
        <ScrollArea className="h-80">
          <div className="p-2">
            {notifications.map((notification, index) => (
              <div key={notification.id} >
                <div className={`flex gap-3 p-4 items-start rounded-lg hover:bg-accent cursor-pointer ${
                  !notification.read ? "bg-primary/5" : ""
                }`}>
                  <div className={`p-2 rounded-full ${
                    notification.type === "message" ? "bg-blue-100 text-blue-600" :
                    notification.type === "user" ? "bg-green-100 text-green-600" :
                    "bg-orange-100 text-orange-600"
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="my-1" />}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}