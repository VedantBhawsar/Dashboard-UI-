import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Search, Filter, Calendar, Clock, User, MoreHorizontal, LayoutGrid, List } from "lucide-react";
import { CreateTaskSheet } from "@/components/create-task-sheet";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const initialTasks = [
  {
    id: 1,
    title: "Prepare a detailed feedback for a user survey",
    description: "Create a 5-question survey to gather insights from beta users.",
    priority: "low",
    status: "todo",
    dueDate: "July 12, 2025",
    assignees: [
      { id: 1, name: "John Doe", avatar: "/avatars/john.jpg", initials: "JD" },
      { id: 2, name: "Jane Smith", avatar: "/avatars/jane.jpg", initials: "JS" }
    ],
  },
  {
    id: 2,
    title: "Design a settings page",
    description: "Create the layout and UI components for the new settings screen.",
    priority: "medium",
    status: "todo",
    dueDate: "July 9, 2025",
    assignees: [
      { id: 3, name: "Mike Johnson", avatar: "/avatars/mike.jpg", initials: "MJ" }
    ],
  },
  {
    id: 3,
    title: "Plan and schedule next month's social media calendar",
    description: "Draft next month's posts and assign content to the team.",
    priority: "low",
    status: "todo",
    dueDate: "July 12, 2025",
    assignees: [
      { id: 1, name: "John Doe", avatar: "/avatars/john.jpg", initials: "JD" },
      { id: 2, name: "Jane Smith", avatar: "/avatars/jane.jpg", initials: "JS" }
    ],
  },
  {
    id: 4,
    title: "Improve search functionality",
    description: "Enhance relevance of results and add filters for better UX.",
    priority: "high",
    status: "in-progress",
    dueDate: "July 8, 2025",
    assignees: [
      { id: 4, name: "Sarah Wilson", avatar: "/avatars/sarah.jpg", initials: "SW" }
    ],
  },
  {
    id: 5,
    title: "Optimize the page speed for the website",
    description: "Minimize JS bundles and compress images across the site.",
    priority: "low",
    status: "in-progress",
    dueDate: "July 9, 2025",
    assignees: [
      { id: 2, name: "Jane Smith", avatar: "/avatars/jane.jpg", initials: "JS" },
      { id: 3, name: "Mike Johnson", avatar: "/avatars/mike.jpg", initials: "MJ" }
    ],
  },
  {
    id: 6,
    title: "Build pricing page",
    description: "Design and develop the new pricing page with updated tiers.",
    priority: "medium",
    status: "in-progress",
    dueDate: "July 7, 2025",
    assignees: [
      { id: 1, name: "John Doe", avatar: "/avatars/john.jpg", initials: "JD" },
      { id: 4, name: "Sarah Wilson", avatar: "/avatars/sarah.jpg", initials: "SW" }
    ],
  },
  {
    id: 7,
    title: "Test onboarding emails",
    description: "QA the full welcome email series in staging environment.",
    priority: "low",
    status: "in-progress",
    dueDate: "July 8, 2025",
    assignees: [
      { id: 4, name: "Sarah Wilson", avatar: "/avatars/sarah.jpg", initials: "SW" }
    ],
  },
  {
    id: 8,
    title: "Fix 404 redirects",
    description: "All broken links now redirect to a custom error page.",
    priority: "low",
    status: "completed",
    dueDate: "July 5, 2025",
    assignees: [
      { id: 3, name: "Mike Johnson", avatar: "/avatars/mike.jpg", initials: "MJ" }
    ],
  },
  {
    id: 9,
    title: "Finalize the animation illustrations",
    description: "Deliver the animation assets in .gif and .json formats.",
    priority: "high",
    status: "completed",
    dueDate: "July 6, 2025",
    assignees: [
      { id: 2, name: "Jane Smith", avatar: "/avatars/jane.jpg", initials: "JS" }
    ],
  },
];

const priorityColors = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  medium: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
};

const columns = [
  { id: "todo", title: "To do", count: 3 },
  { id: "in-progress", title: "In progress", count: 4 },
  { id: "under-review", title: "Under review", count: 0 },
  { id: "completed", title: "Completed", count: 2 },
];

export default function Tasks() {
  const [viewMode, setViewMode] = useState("board");
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<typeof tasks[0] | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTask = (newTask: any) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = tasks.some(task => task.id === activeId);
    const isOverATask = tasks.some(task => task.id === overId);

    if (!isActiveATask) return;

    // Dropping a task over another task
    if (isActiveATask && isOverATask) {
      setTasks(prevTasks => {
        const activeIndex = prevTasks.findIndex(task => task.id === activeId);
        const overIndex = prevTasks.findIndex(task => task.id === overId);

        if (prevTasks[activeIndex].status !== prevTasks[overIndex].status) {
          prevTasks[activeIndex].status = prevTasks[overIndex].status;
        }

        return prevTasks;
      });
    }

    // Dropping a task over a column
    const isOverAColumn = columns.some(column => column.id === overId);
    if (isActiveATask && isOverAColumn) {
      setTasks(prevTasks => {
        const activeIndex = prevTasks.findIndex(task => task.id === activeId);
        prevTasks[activeIndex].status = overId as string;
        return [...prevTasks];
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
  };

  const SortableTask = ({ task }: { task: typeof tasks[0] }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TaskCard task={task} />
      </div>
    );
  };

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className="bg-card hover:shadow-md transition-all duration-200 border border-border/50">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm text-foreground leading-tight">{task.title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground leading-relaxed">{task.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{task.dueDate}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {task.assignees.slice(0, 3).map((assignee, index) => (
                <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={assignee.avatar} alt={assignee.name} />
                  <AvatarFallback className="text-xs bg-muted">{assignee.initials}</AvatarFallback>
                </Avatar>
              ))}
              {task.assignees.length > 3 && (
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs bg-muted">+{task.assignees.length - 3}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-start">
          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const DroppableColumn = ({ column, children }: { column: typeof columns[0], children: React.ReactNode }) => {
    const {
      setNodeRef,
      isOver,
    } = useSortable({ id: column.id });

    return (
      <div
        ref={setNodeRef}
        className={`space-y-4 min-h-[200px] ${isOver ? 'bg-accent/50 rounded-lg' : ''}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-foreground">{column.title}</h3>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
              {filteredTasks.filter(task => task.status === column.id).length}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <CreateTaskSheet
              onCreateTask={handleCreateTask}
              trigger={
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="h-3 w-3" />
                </Button>
              }
            />
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          {children}
          
          {column.id === "under-review" && filteredTasks.filter(task => task.status === column.id).length === 0 && (
            <CreateTaskSheet
              onCreateTask={handleCreateTask}
              trigger={
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-border/80">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Create task
                  </Button>
                </div>
              }
            />
          )}
        </div>
      </div>
    );
  };

  const BoardView = () => (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(task => task.status === column.id);
          
          return (
            <SortableContext key={column.id} items={columnTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
              <DroppableColumn column={column}>
                {columnTasks.map((task) => (
                  <SortableTask key={task.id} task={task} />
                ))}
              </DroppableColumn>
            </SortableContext>
          );
        })}
      </div>
      
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );

  const ListView = () => (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <Card key={task.id} className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  
                  <div className="flex -space-x-1">
                    {task.assignees.slice(0, 3).map((assignee) => (
                      <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={assignee.avatar} alt={assignee.name} />
                        <AvatarFallback className="text-xs bg-muted">{assignee.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                    {task.assignees.length > 3 && (
                      <Avatar className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs bg-muted">+{task.assignees.length - 3}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Tasks</h2>
          <p className="text-muted-foreground mt-1">
            Visual representation of your project's journey.
          </p>
        </div>
        <CreateTaskSheet
          onCreateTask={handleCreateTask}
          trigger={
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="board" className="flex items-center space-x-2">
              <LayoutGrid className="h-4 w-4" />
              <span>Board</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>List</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mt-6">
        {viewMode === "board" ? <BoardView /> : <ListView />}
      </div>
    </div>
  );
}