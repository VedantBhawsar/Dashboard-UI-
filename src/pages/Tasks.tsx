import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Calendar, Clock, User } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Review project proposal",
    description: "Go through the new client proposal and provide feedback",
    priority: "high",
    status: "pending",
    dueDate: "2025-01-15",
    assignee: "John Doe",
    completed: false,
  },
  {
    id: 2,
    title: "Update dashboard metrics",
    description: "Refresh all KPI displays with latest data",
    priority: "medium",
    status: "in-progress",
    dueDate: "2025-01-12",
    assignee: "Jane Smith",
    completed: false,
  },
  {
    id: 3,
    title: "Fix login bug",
    description: "Resolve authentication issue on mobile devices",
    priority: "high",
    status: "pending",
    dueDate: "2025-01-10",
    assignee: "Mike Johnson",
    completed: true,
  },
  {
    id: 4,
    title: "Prepare quarterly report",
    description: "Compile Q4 performance data and create presentation",
    priority: "low",
    status: "completed",
    dueDate: "2025-01-20",
    assignee: "Sarah Wilson",
    completed: true,
  },
];

const priorityColors = {
  high: "destructive",
  medium: "default",
  low: "secondary",
};

const statusColors = {
  pending: "outline",
  "in-progress": "default",
  completed: "secondary",
};

export default function Tasks() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || task.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h2>
          <p className="text-muted-foreground">
            Manage your tasks and track progress.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`transition-all hover:shadow-md ${task.completed ? 'opacity-70' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={task.completed}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <CardTitle className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={priorityColors[task.priority as keyof typeof priorityColors] as any}>
                    {task.priority}
                  </Badge>
                  <Badge variant={statusColors[task.status as keyof typeof statusColors] as any}>
                    {task.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{task.assignee}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Due in 3 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}