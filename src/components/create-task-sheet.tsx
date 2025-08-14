import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar, ChevronDown, MessageSquare, Paperclip, Plus, X } from "lucide-react";

interface CreateTaskSheetProps {
  onCreateTask: (task: any) => void;
  trigger: React.ReactNode;
}

export function CreateTaskSheet({ onCreateTask, trigger }: CreateTaskSheetProps) {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [list, setList] = useState("under-review");
  const [dueDate, setDueDate] = useState("2025-07-20");
  const [priority, setPriority] = useState("low");
  const [assignTo, setAssignTo] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleSubmit = () => {
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskName,
      description: description || "No description provided",
      priority,
      status: list,
      dueDate: new Date(dueDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      assignees: assignTo ? [
        { id: Date.now(), name: assignTo, avatar: "", initials: assignTo.split(' ').map(n => n[0]).join('') }
      ] : [],
    };

    onCreateTask(newTask);
    
    // Reset form
    setTaskName("");
    setList("under-review");
    setDueDate("2025-07-20");
    setPriority("low");
    setAssignTo("");
    setDescription("");
    setComment("");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Create new task</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="task-name">Task name</Label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="list">List</Label>
              <Select value={list} onValueChange={setList}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To do</SelectItem>
                  <SelectItem value="in-progress">In progress</SelectItem>
                  <SelectItem value="under-review">Under review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due-date">Due date</Label>
              <div className="relative">
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex space-x-2">
                {["low", "medium", "high"].map((p) => (
                  <Button
                    key={p}
                    variant={priority === p ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPriority(p)}
                    className={priority === p ? "bg-primary text-primary-foreground" : ""}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assign-to">Assign to</Label>
              <Select value={assignTo} onValueChange={setAssignTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                  <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Collapsible open={showDescription} onOpenChange={setShowDescription}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal">
                <Plus className="h-4 w-4 mr-2" />
                Description
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Textarea
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={showAttachments} onOpenChange={setShowAttachments}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal">
                <Paperclip className="h-4 w-4 mr-2" />
                Attachments
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground">
                <Paperclip className="h-8 w-8 mx-auto mb-2" />
                <p>Drag and drop files here or click to browse</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={showComments} onOpenChange={setShowComments}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={2}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="flex justify-end space-x-2 mt-8 pt-6 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!taskName.trim()}>
            Create task
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}