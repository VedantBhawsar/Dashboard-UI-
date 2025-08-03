import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPopup } from "@/components/notifications-popup"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Star, 
  Archive, 
  Trash2,
  Reply,
  Forward,
  Paperclip
} from "lucide-react"

interface EmailItem {
  id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  time: string
  read: boolean
  starred: boolean
  hasAttachment: boolean
  avatar?: string
}

const emails: EmailItem[] = [
  {
    id: "1",
    sender: "Sarah Johnson",
    senderEmail: "sarah@company.com",
    subject: "Project Update - Q4 Review",
    preview: "Hi team, I wanted to share the latest updates on our Q4 project milestones. We've made significant progress...",
    time: "2 min ago",
    read: false,
    starred: true,
    hasAttachment: true
  },
  {
    id: "2",
    sender: "Marketing Team",
    senderEmail: "marketing@company.com",
    subject: "New Campaign Launch",
    preview: "Exciting news! Our new marketing campaign is ready to launch next week. Please review the attached materials...",
    time: "1 hour ago",
    read: false,
    starred: false,
    hasAttachment: false
  },
  {
    id: "3",
    sender: "John Smith",
    senderEmail: "john@partner.com",
    subject: "Meeting Follow-up",
    preview: "Thank you for the productive meeting today. As discussed, I'm sending over the contract details...",
    time: "3 hours ago",
    read: true,
    starred: false,
    hasAttachment: true
  },
  {
    id: "4",
    sender: "System Notifications",
    senderEmail: "noreply@system.com",
    subject: "Weekly Report Available",
    preview: "Your weekly analytics report is now available for download. This week's highlights include...",
    time: "1 day ago",
    read: true,
    starred: false,
    hasAttachment: false
  }
]

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(emails[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unreadCount = emails.filter(email => !email.read).length

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">Inbox</h1>
            <Badge variant="secondary">{unreadCount} unread</Badge>
          </div>
          <div className="flex items-center gap-4">
            <NotificationsPopup />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Email List */}
        <div className="w-96 border-r bg-card/50">
          {/* Search and Filters */}
          <div className="p-4 border-b space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search emails..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>

          {/* Email List */}
          <div className="overflow-y-auto">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                  selectedEmail?.id === email.id ? "bg-accent" : ""
                } ${!email.read ? "bg-primary/5" : ""}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={email.avatar} />
                    <AvatarFallback>{email.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm truncate ${!email.read ? "font-semibold" : "font-medium"}`}>
                        {email.sender}
                      </p>
                      <div className="flex items-center gap-1">
                        {email.starred && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        )}
                        <span className="text-xs text-muted-foreground">{email.time}</span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-1 ${!email.read ? "font-medium" : ""}`}>
                      {email.subject}
                    </p>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {email.preview}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        {email.hasAttachment && (
                          <Paperclip className="h-3 w-3 text-muted-foreground" />
                        )}
                        {!email.read && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 flex flex-col">
          {selectedEmail ? (
            <>
              {/* Email Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedEmail.avatar} />
                      <AvatarFallback>
                        {selectedEmail.sender.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{selectedEmail.subject}</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedEmail.sender}</span>
                        <span>&lt;{selectedEmail.senderEmail}&gt;</span>
                        <Separator orientation="vertical" className="h-4" />
                        <span>{selectedEmail.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className={`h-4 w-4 ${selectedEmail.starred ? "text-yellow-500 fill-yellow-500" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className="flex-1 p-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <p className="text-sm leading-relaxed">
                        {selectedEmail.preview}
                      </p>
                      <br />
                      <p className="text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <br />
                      <p className="text-sm leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <br />
                      <p className="text-sm leading-relaxed">
                        Best regards,<br />
                        {selectedEmail.sender}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Email Actions */}
              <div className="p-6 border-t">
                <div className="flex gap-2">
                  <Button>
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline">
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8" />
                </div>
                <p>Select an email to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Inbox