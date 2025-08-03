import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Mail, Phone, MapPin, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const contacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc",
    role: "Software Engineer",
    location: "San Francisco, CA",
    status: "active",
    avatar: "",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@startup.io",
    phone: "+1 (555) 987-6543",
    company: "StartupIO",
    role: "Product Manager",
    location: "New York, NY",
    status: "active",
    avatar: "",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@freelancer.com",
    phone: "+1 (555) 456-7890",
    company: "Freelancer",
    role: "UX Designer",
    location: "Los Angeles, CA",
    status: "inactive",
    avatar: "",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@enterprise.com",
    phone: "+1 (555) 321-0987",
    company: "Enterprise Corp",
    role: "Marketing Director",
    location: "Chicago, IL",
    status: "active",
    avatar: "",
  },
  {
    id: 5,
    name: "Alex Chen",
    email: "alex.chen@innovation.tech",
    phone: "+1 (555) 654-3210",
    company: "Innovation Tech",
    role: "DevOps Engineer",
    location: "Seattle, WA",
    status: "pending",
    avatar: "",
  },
];

const statusColors = {
  active: "default",
  inactive: "secondary",
  pending: "outline",
};

export default function Contacts() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || contact.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Contacts</h2>
          <p className="text-muted-foreground">
            Manage your business contacts and relationships.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
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
            <SelectItem value="all">All Contacts</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                    <p className="text-sm font-medium text-primary">{contact.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={statusColors[contact.status as keyof typeof statusColors] as any}>
                    {contact.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{contact.location}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button size="sm" className="flex-1">
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}