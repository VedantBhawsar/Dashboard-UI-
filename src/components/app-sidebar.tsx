import { useState } from "react"
import {
  Calendar,
  Users,
  CheckSquare,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Crown,
  Inbox
} from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchPopup } from "@/components/search-popup"

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Support", url: "/support", icon: HelpCircle },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <Sidebar className="border-r bg-card">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="font-bold text-lg">MADE</div>
          <div className="text-xs text-muted-foreground">IN FIGMA</div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <div className="space-y-4">
          {/* Quick Search */}
          <div className="px-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 h-10 text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent transition-all duration-200 hover:scale-105"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              {!collapsed && <span>Quick Search</span>}
            </Button>
          </div>

          {/* Inbox */}
          <div className="px-2">
            <Button 
              variant="ghost" 
              className="w-full justify-between h-10 text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                {!collapsed && <span>Inbox</span>}
              </div>
              {!collapsed && <Badge variant="secondary">6</Badge>}
            </Button>
          </div>

          {/* Notifications */}
          <div className="px-2">
            <Button 
              variant="ghost" 
              className="w-full justify-between h-10 text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                {!collapsed && <span>Notifications</span>}
              </div>
              {!collapsed && <Badge variant="secondary">11+</Badge>}
            </Button>
          </div>

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                       <NavLink 
                        to={item.url} 
                        className={({ isActive }) =>
                          `flex items-center gap-2 h-10 px-2 rounded-md transition-all duration-200 hover:scale-105 ${
                            isActive 
                              ? "bg-primary text-primary-foreground font-medium shadow-lg" 
                              : "text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
                          }`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* Bottom Section */}
      <div className="mt-auto p-4 space-y-4">
        {/* Current Plan */}
        <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
          <div className="p-2 bg-warning/20 rounded-full">
            <Crown className="h-4 w-4 text-warning" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Current Plan:</div>
              <div className="text-sm text-muted-foreground">Free trial</div>
            </div>
          )}
        </div>

        {/* Upgrade Button */}
        {!collapsed && (
          <Button className="w-full gap-2" variant="outline">
            <Crown className="h-4 w-4" />
            Upgrade to PRO
          </Button>
        )}

        {/* User Profile */}
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/lovable-uploads/bc7bed1d-2ec6-4b65-8488-9d5eb9ee6e93.png" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Ryan</div>
              <div className="text-xs text-muted-foreground">Free trial: 8 days left</div>
            </div>
          )}
        </div>
      </div>
      
      <SearchPopup open={searchOpen} onOpenChange={setSearchOpen} />
    </Sidebar>
  )
}