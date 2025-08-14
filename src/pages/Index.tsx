import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPopup } from "@/components/notifications-popup"
import { MetricCard } from "@/components/dashboard/metric-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { CalendarWidget } from "@/components/dashboard/calendar-widget"
import { UserAcquisition } from "@/components/dashboard/user-acquisition"

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
          </div>
          <div className="flex items-center gap-4">
            <NotificationsPopup />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight hover:text-primary transition-colors cursor-default">Morning, Ryan!</h1>
          <p className="text-muted-foreground hover:text-foreground transition-colors cursor-default">Here's a quick overview of your business.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total customers" 
            value="15,983" 
            change="12% from last month" 
            isPositive={true} 
          />
          <MetricCard 
            title="New customers this month" 
            value="2,571" 
            change="7% from last month" 
            isPositive={true} 
          />
          <MetricCard 
            title="Monthly recurring revenue" 
            value="$479,330" 
            change="12% from last month" 
            isPositive={true} 
          />
          <MetricCard 
            title="Expenses" 
            value="$11,648" 
            change="4% from last month" 
            isPositive={false} 
          />
        </div>

        {/* Charts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <CalendarWidget />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UserAcquisition />
        </div>
      </main>
    </div>
  );
};

export default Index;
