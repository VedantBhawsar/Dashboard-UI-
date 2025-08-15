import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddContactSheet } from "@/components/add-contact-sheet";
import { cn } from "@/lib/utils";

interface Contact {
  id: number
  fullName: string
  email: string
  phone: string
  company: string
  status: "Contact" | "Prospect" | "Lead" | "Customer" | "Churned"
  avatar?: string
  address?: string
  leadSource?: string
  notes?: string
}

const initialContacts: Contact[] = [
  {
    id: 1,
    fullName: "Ryan Almeida",
    email: "ryan.almeida@email.com",
    phone: "+1 000 000 0000",
    company: "MadeinFigma",
    status: "Lead",
    avatar: "",
  },
  {
    id: 2,
    fullName: "Maya Henderson",
    email: "maya.h@email.com",
    phone: "+1 310-555-0199",
    company: "Looped Media",
    status: "Contact",
    avatar: "",
  },
  {
    id: 3,
    fullName: "Aiden Clark",
    email: "aiden.clark@email.com",
    phone: "+1 212-555-0132",
    company: "Novexa Technologies",
    status: "Lead",
    avatar: "",
  },
  {
    id: 4,
    fullName: "Omar Al-Farsi",
    email: "omar_219@email.com",
    phone: "+966 55 123 4477",
    company: "AlMotlaq Group",
    status: "Customer",
    avatar: "",
  },
  {
    id: 5,
    fullName: "Rachel Kim",
    email: "r.kim_1985@email.com",
    phone: "+1 415-555-0456",
    company: "Northpeak Agency",
    status: "Prospect",
    avatar: "",
  },
  {
    id: 6,
    fullName: "Sanjay Mehta",
    email: "sanjay.mehta@email.com",
    phone: "+91 90043 22478",
    company: "ZenPay Solutions",
    status: "Lead",
    avatar: "",
  },
  {
    id: 7,
    fullName: "Tomás Oliveira",
    email: "thomas_tech@email.com",
    phone: "+55 11 94562-2289",
    company: "FlorenTech",
    status: "Contact",
    avatar: "",
  },
  {
    id: 8,
    fullName: "Julian Bennett",
    email: "jbennett.2025@email.com",
    phone: "+1 202-555-0191",
    company: "Archon Labs",
    status: "Lead",
    avatar: "",
  },
  {
    id: 9,
    fullName: "Chen Wei",
    email: "chen.wei@email.com",
    phone: "+86 137 2222 8899",
    company: "Orbiq Systems",
    status: "Customer",
    avatar: "",
  },
];

const statusColors = {
  Contact: "bg-blue-100 text-blue-700 border-blue-200",
  Prospect: "bg-blue-100 text-blue-700 border-blue-200",
  Lead: "bg-orange-100 text-orange-700 border-orange-200",
  Customer: "bg-green-100 text-green-700 border-green-200",
  Churned: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSelectContact = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const handleAddContact = (newContact: Omit<Contact, "id">) => {
    const contact = {
      ...newContact,
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
    };
    setContacts(prev => [...prev, contact]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Contact management</h2>
          <p className="text-muted-foreground">
            Manage all your contacts and leads.
          </p>
        </div>
        <Button onClick={() => setSheetOpen(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Contacts</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-[auto_2fr_2fr_1.5fr_1.5fr_1fr_auto] gap-4 p-4 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Checkbox
                  checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </div>
              <div>Contact</div>
              <div>Email address</div>
              <div>Phone number</div>
              <div>Company</div>
              <div>Status</div>
              <div></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {filteredContacts.map((contact) => (
                <div 
                  key={contact.id} 
                  className="grid grid-cols-[auto_2fr_2fr_1.5fr_1.5fr_1fr_auto] gap-4 p-4 hover:bg-muted/50 transition-colors items-center"
                >
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => handleSelectContact(contact.id)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(contact.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{contact.fullName}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {contact.email}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {contact.phone}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {contact.company}
                  </div>
                  
                  <div>
                    <Badge 
                      variant="outline" 
                      className={cn("border", statusColors[contact.status])}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full mr-1",
                        contact.status === "Lead" ? "bg-orange-500" :
                        contact.status === "Customer" ? "bg-green-500" :
                        contact.status === "Prospect" ? "bg-blue-500" :
                        "bg-blue-500"
                      )}></div>
                      {contact.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-background border-border shadow-lg">
                        <DropdownMenuItem className="hover:bg-accent">View Details</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-accent">Edit Contact</DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-accent">Send Message</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AddContactSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onSave={handleAddContact}
      />
    </div>
  );
}