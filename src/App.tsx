import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Index from "./pages/Index";
import Inbox from "./pages/Inbox";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useTheme() as {
    theme: "dark" | "light" | "system";
  }

  console.log(theme);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner richColors theme={theme} />
      <BrowserRouter> 
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
